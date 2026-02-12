
import routes from "./routes";
import { errorHandler } from "./errors/app.error.handler";
import { AppError } from "./errors";
import express, { Application, Request, Response } from "express";


const app: Application = express();

/* -------------------- Global Middlewares -------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------- Health Check -------------------- */
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("<h1>Hello, Production-ready Node + TS!</h1>");
});

/* -------------------- Routes -------------------- */
app.use("/api/v1", routes);

app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

app.use(errorHandler)

export default app;
