import HttpException from "../common/http-exception";
import { Request, Response, NextFunction } from "express";
import { error } from "../common/responses";

const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.statusCode || err.status || 500;
  const message = err.message || "Error";
  // console.error("errorHandler", err);
  return error(res, "", message, status);
};

export { errorHandler }