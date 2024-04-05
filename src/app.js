import express from "express";
import { globalErrorHandler, notFoundController } from "./utils/appError.js";

import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// update
import usersRoutes from "./routes/usersRoutes.js";


import morgan from "morgan";
import { httpLogger } from "./utils/logger.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticPath = path.join(dirname(__dirname), "./public");
const staticPathImage = path.join(dirname(__dirname), "./public/images");
const staticPathAgreement = path.join(dirname(__dirname), "./public/agreement");



// middleware use
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.use("/images", express.static(staticPathImage));
app.use("/agreement", express.static(staticPathAgreement));

app.use(httpLogger);
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);

app.use("/api/v1", usersRoutes);


app.use(notFoundController);
app.use(globalErrorHandler);


export default app;
