import app from "../app";
import { Request, Response } from "express";

export const api = (req: Request, res: Response) => {
  return app(req, res);
};
