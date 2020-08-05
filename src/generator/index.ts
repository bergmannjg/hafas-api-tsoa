// Generate controller methods from a TypeScript declaration file
import * as ts from "typescript";
const argv = require('yargs').array('x').argv;

class Parameter {
    name: string;
    parent: string;
    optional: boolean;
    comment: string;
    typeName: string;
    defaultValue: string;
    depth: number;
    constructor(name: string, parent: string, optional: boolean, comment: string, typeName: string, defaultValue: string, depth: number) {
        this.name = name;
        this.parent = parent;
        this.optional = optional;
        this.comment = comment;
        this.typeName = typeName;
        this.defaultValue = defaultValue;
        this.depth = depth;
    }

    path = () => {
        if (this.parent === "") return this.name
        else return this.parent + "." + this.name;
    }

    literalType = () => this.typeName.startsWith("\"");

    exclusionPosible = () => this.literalType() || this.optional || this.defaultValue != "";
}

class SymbolInfo {
    symbol: ts.Symbol;
    optional: boolean;
    constructor(symbol: ts.Symbol, optional: boolean) {
        this.symbol = symbol;
        this.optional = optional;
    }
}

class Method {
    methodName: string;
    optional: boolean;
    returnType: string;
    aliasReturnType: string;
    comment: string;
    parameters: Parameter[];
    constructor(methodName: string, optional: boolean, returnType: string, comment: string, parameters: Parameter[]) {
        this.methodName = methodName;
        this.optional = optional;
        this.returnType = returnType;
        this.aliasReturnType = "";
        this.comment = comment;
        this.parameters = parameters;
    }
}

function extract(file: string, methodName: string, excludes: string[], maxdepth: number): void {
    const program = ts.createProgram([file], { allowJs: true });
    const sourceFile = program.getSourceFile(file);
    const checker = program.getTypeChecker();

    if (!sourceFile) {
        console.log("file %s not found", file)
        return;
    }

    const methodSymbolInfo = findMethodSymbol(sourceFile, methodName);
    if (!methodSymbolInfo) {
        console.log("method %s not found", methodName)
        return;
    }

    const method = collectMethodInfo(methodName, methodSymbolInfo.symbol, methodSymbolInfo.optional);
    if (!method.returnType.includes("Promise")) {
        console.error(`"error: method ${method.methodName}, promise expected as returnType"`)
        return;
    }

    adjustReturnType(method);
    emitControllerMethod(method, excludes);

    function findMethodSymbol(sourceFile: ts.SourceFile, methodName: string): SymbolInfo | undefined {
        let symbolInfo: SymbolInfo | undefined;

        extractNode(sourceFile);
        return symbolInfo;

        function extractNode(node: ts.Node) {
            if (ts.isInterfaceDeclaration(node)) {
                for (const member of node.members) {
                    if (ts.isPropertySignature(member)) {
                        if (ts.isIdentifier(member.name) && member.type && ts.isFunctionTypeNode(member.type)) {
                            if (member.name.text === methodName) {
                                const symbol = checker.getSymbolAtLocation(member.name);
                                if (symbol) symbolInfo = new SymbolInfo(symbol, !!member.questionToken);
                            }
                        }
                    }
                }
            }

            if (!symbolInfo) ts.forEachChild(node, extractNode);
        };
    }

    function collectMethodInfo(methodName: string, symbol: ts.Symbol, optional: boolean): Method {
        const parameters: Parameter[] = [];

        function collectParameter(parameterSymbol: ts.Symbol, depth: number, jsdocParamTag?: ts.JSDocTagInfo) {
            const type = checker.getTypeOfSymbolAtLocation(parameterSymbol, parameterSymbol.valueDeclaration!);
            if (depth < maxdepth && type.flags & ts.TypeFlags.Object) {
                const objType = type as ts.ObjectType;
                if (objType.objectFlags & ts.ObjectFlags.Interface) {
                    objType.symbol.members?.forEach(element => {
                        collectParameter(element, depth + 1);
                    });
                    return;
                }
            }

            const optional = parameterSymbol.flags & ts.SymbolFlags.Optional ? true : false;
            const name = parameterSymbol.getName();
            let parent = "";
            const s = (parameterSymbol as any)["parent"]; // todo
            if (s && s["flags"]) {
                const parentSymbol = s as ts.Symbol;
                if (parentSymbol.flags & ts.SymbolFlags.Interface) {
                    parent = parentSymbol.getName();
                }
            }
            let comment = ts.displayPartsToString(parameterSymbol.getDocumentationComment(checker));
            if (comment === "" && jsdocParamTag && jsdocParamTag.text) {
                comment = jsdocParamTag.text.substr(name.length + 1);
            }
            const typeString = checker.typeToString(type);
            const tags = parameterSymbol.getJsDocTags().filter(t => t.name === "default");
            let defaultValue = tags.length == 1 && tags[0].text ? tags[0].text : "";
            if (typeString == "string" && defaultValue !== "" && defaultValue !== "undefined") {
                defaultValue = "\"" + defaultValue + "\"";
            }

            parameters.push(new Parameter(name, parent, optional, comment, typeString, defaultValue, depth));
        }

        let methodReturnType = "";
        let methodComment = "";

        methodComment = ts.displayPartsToString(symbol.getDocumentationComment(checker));
        const tags = symbol.getJsDocTags();
        let callType = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!);
        const signatures = callType.getCallSignatures();
        if (signatures.length === 1) {
            const signature = signatures[0];
            methodReturnType = checker.typeToString(signature.getReturnType(), undefined, ts.TypeFormatFlags.WriteArrayAsGenericType);
            for (const parameter of signature.parameters) {
                const jsParamTags = tags.filter(t => t.name === "param" && t.text && t.text.startsWith(parameter.getName()));
                collectParameter(parameter, 1, jsParamTags.length === 1 ? jsParamTags[0] : undefined);
            }
        }

        return new Method(methodName, optional, methodReturnType, methodComment, parameters);
    }

    // tsoa cannot handle readonly typeoperator
    function adjustReturnType(method: Method) {
        // strip Promise
        method.returnType = method.returnType.replace("Promise<", "");
        method.returnType = method.returnType.substr(0, method.returnType.length - 1);

        method.returnType = method.returnType.replace("ReadonlyArray", "Array");
        method.aliasReturnType = " as " + method.returnType;

        // add Promise again
        if (method.optional) method.returnType = "Promise<" + method.returnType + "|{}>";
        else method.returnType = "Promise<" + method.returnType + ">";
    }

    function emitControllerMethod(method: Method, excludes: string[]) {
        const errors = method.parameters.filter(p => excludes.find(x => x === p.path() && !p.exclusionPosible()));
        if (errors.length) {
            for (const error of errors) {
                console.error("exlude field '%s' has no default value", error.name);

            }
            return;
        }

        // strip union type to string stype
        const unions = method.parameters.filter(p => p.typeName.includes("|") && !excludes.find(x => x === p.path()));
        if (unions.length) {
            for (const union of unions) {
                if (union.typeName.includes("string")) {
                    union.typeName = "string";
                } else {
                    console.error(`"error: method ${method.methodName}, union type '${union.typeName}' must contain string type"`);
                    return;
                }
            }
        }

        const fparameters = method.parameters.filter(p => !excludes.find(x => x === p.path()));
        console.log("/**");
        console.log("* %s", method.comment);
        for (const parameter of fparameters) {
            console.log("* @param %s %s", parameter.name, parameter.comment);
        }
        console.log("*/");
        console.log("@Get(\"%s\")", method.methodName);
        console.log("public async get%s(", method.methodName);
        for (const parameter of fparameters) {
            if (parameter.defaultValue) {
                console.log("@Query() %s = %s,", parameter.name, parameter.defaultValue);
            } else {
                console.log("@Query() %s: %s,", parameter.name, parameter.typeName);
            }
        }
        console.log("): %s {", method.returnType);
        console.log("const client = this.clientFactory();");
        let parametersString = "";
        let currentDepth = 1;
        let currentParent = "";
        for (const parameter of method.parameters) {
            const excluded = excludes.find(x => x === parameter.path()) !== undefined;
            if (!excluded || !parameter.optional) {
                if (currentParent != "" && currentParent != parameter.parent) {
                    parametersString += " }";
                    currentDepth = parameter.depth - 1;
                    currentParent = "";
                }
                if (parametersString !== "") {
                    parametersString += ", ";
                }
                if (currentDepth < parameter.depth) {
                    parametersString += "{ ";
                    currentDepth = parameter.depth;
                    currentParent = parameter.parent;
                }
                parametersString += parameter.name;
                if (excluded) {
                    if (parameter.defaultValue != "") {
                        parametersString += ": " + parameter.defaultValue;
                    } else if (parameter.literalType()) {
                        parametersString += ": " + parameter.typeName;
                    }
                }
            }
        }
        if (currentDepth > 1) {
            parametersString += " }";
        }
        if (method.optional) console.log("return client.%s ? await client.%s(%s)%s:{};", method.methodName, method.methodName, parametersString, method.aliasReturnType);
        else console.log("return await client.%s(%s)%s;", method.methodName, parametersString, method.aliasReturnType);
        console.log("}");
    }
}

if (argv.file && argv.method) {
    const excludes: string[] = (argv.x) ? argv.x : [];
    extract(argv.file, argv.method, excludes, 2);
} else {
    console.log('usage: extract --file <file> --method <method> [-x <excludes>]')
}
