import express from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "./routes.js";
import { Response as ExResponse, Request as ExRequest, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import sw from "./swagger.json" assert { type: 'json' }

interface HafasError extends Error {
  isHafasError?: boolean;
}

function isHafasError(err: Error): err is HafasError {
  return (err as HafasError).isHafasError !== undefined;
}

export const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(sw)
  );
});
RegisterRoutes(app);
app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ReferenceError) {
    return res.status(405).json({
      message: err.message,
    });
  }
  if (err instanceof Error) {
    if (isHafasError(err) && err.isHafasError) {
      return res.status(400).json({
        message: err.message,
      });
    } else {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  next();
});