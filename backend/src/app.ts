import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import { env } from "./config/env";
import { errorHandler, notFoundHandler } from "./middleware/error-handler";
import { authRouter } from "./modules/auth/auth.routes";
import { todosRouter } from "./modules/todos/todos.routes";

export const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin: env.WEB_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

app.use((request, _response, next) => {
  if (request.url.startsWith("/.netlify/functions/api")) {
    request.url = `/api${request.url.slice("/.netlify/functions/api".length)}`;
  }

  next();
});

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/todos", todosRouter);

app.use(notFoundHandler);
app.use(errorHandler);
