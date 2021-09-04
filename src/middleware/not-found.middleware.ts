import { Request, Response, NextFunction } from "express";
import { error } from '../common/responses';

const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const message = "Resource not found";

  error(res, "", message, 404);
};

export { notFoundHandler }