// Generate controller methods from a TypeScript declaration file
import ts from "typescript";
import yargs from 'yargs';

const argv = yargs(process.argv.slice(2)).options({
    file: { type: 'string', demandOption: true },
    method: { type: 'string', demandOption: true },
    x: { type: 'array' }
}).parseSync();

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
    if (!method || !method.returnType.includes("Promise")) {
        console.error(`"error: method ${method?.methodName}, promise expected as returnType"`)
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
        }
    }

    function collectMethodInfo(methodName: string, symbol: ts.Symbol, optional: boolean): Method | undefined {
        const parameters: Parameter[] = [];

        function collectParameter(parameterSymbol: ts.Symbol, depth: number, parent: string, jsdocParamTag?: ts.JSDocTagInfo) {
            if (parameterSymbol.valueDeclaration) {
                const type = checker.getTypeOfSymbolAtLocation(parameterSymbol, parameterSymbol.valueDeclaration);
                if (depth < maxdepth && type.flags & ts.TypeFlags.Object) {
                    const objType = type as ts.ObjectType;
                    if (objType.objectFlags & ts.ObjectFlags.Interface) {
                        objType.symbol.members?.forEach(element => {
                            collectParameter(element, depth + 1, objType.symbol.name);
                        });
                        return;
                    }
                }
                const optional = parameterSymbol.flags & ts.SymbolFlags.Optional ? true : false;
                const name = parameterSymbol.getName();
                let comment = ts.displayPartsToString(parameterSymbol.getDocumentationComment(checker));
                if (comment === "" && jsdocParamTag && jsdocParamTag.text && jsdocParamTag.text.length > 0) {
                    comment = jsdocParamTag.text[0].text.substr(name.length + 1);
                }
                const typeString = checker.typeToString(type);
                const tags = parameterSymbol.getJsDocTags().filter(t => t.name === "default");
                let defaultValue = tags.length == 1 && tags[0].text && tags[0].text?.length > 0 ? tags[0].text[0].text : "";
                if (typeString == "string" && defaultValue !== "" && defaultValue !== "undefined") {
                    defaultValue = "\"" + defaultValue + "\"";
                }

                parameters.push(new Parameter(name, parent, optional, comment, typeString, defaultValue, depth));
            }
        }

        if (symbol.valueDeclaration) {
            let methodReturnType = "";
            let methodComment = "";

            methodComment = ts.displayPartsToString(symbol.getDocumentationComment(checker));
            const tags = symbol.getJsDocTags();
            const callType = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);
            const signatures = callType.getCallSignatures();
            if (signatures.length === 1) {
                const signature = signatures[0];
                methodReturnType = checker.typeToString(signature.getReturnType(), undefined, ts.TypeFormatFlags.WriteArrayAsGenericType);
                for (const parameter of signature.parameters) {
                    const jsParamTags = tags.filter(t => t.name === "param" && t.text && t.text[0].text.startsWith(parameter.getName()));
                    collectParameter(parameter, 1, "", jsParamTags.length === 1 ? jsParamTags[0] : undefined);
                }
            }

            return new Method(methodName, optional, methodReturnType, methodComment, parameters);
        }
    }

    function stripPromise(returnType: string) {
        const rt = returnType.replace("Promise<", "");
        return rt.substr(0, rt.length - 1);
    }

    // tsoa cannot handle readonly typeoperator
    function adjustReturnType(method: Method) {
        method.returnType = stripPromise(method.returnType);

        method.returnType = method.returnType.replace("ReadonlyArray", "Array");
        method.aliasReturnType = " as " + method.returnType;

        // add Promise again
        if (method.optional) method.returnType = "Promise<" + method.returnType + ">";
        else method.returnType = "Promise<" + method.returnType + ">";
    }

    function capitalizeFirstLetter(s: string) {
        return s.charAt(0).toUpperCase() + s.slice(1);
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
        console.log("* @param profileId endpoint profile id");
        for (const parameter of fparameters) {
            console.log("* @param %s %s", parameter.name, parameter.comment);
        }
        console.log("*/");
        console.log("@Get(\"{profileId}/%s\")", method.methodName);
        console.log("public async get%s(", method.methodName);
        console.log("  profileId: ProfileId,");
        for (const parameter of fparameters) {
            if (parameter.defaultValue) {
                console.log("  @Query() %s = %s,", parameter.name, parameter.defaultValue);
            } else {
                console.log("  @Query() %s: %s,", parameter.name, parameter.typeName);
            }
        }
        console.log("): %s {", method.returnType);
        console.log("const client = this.clientFactory(profileId);");
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
        if (method.optional) {
            const errorAction = "throw ReferenceError(\"method not defined\")";
            console.log("if (client.%s) return await client.%s(%s)%s; else %s;", method.methodName, method.methodName, parametersString, method.aliasReturnType, errorAction);
        } else {
            console.log("return await client.%s(%s)%s;", method.methodName, parametersString, method.aliasReturnType);
        }
        console.log("}");
    }
}

if (argv.file && argv.method) {
    const excludes: string[] = (argv.x) ? argv.x as string[] : [];
    extract(argv.file, argv.method, excludes, 2);
} else {
    console.log('usage: extract --file <file> --method <method> [-x <excludes>]')
}
