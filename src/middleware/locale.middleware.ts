import { NextFunction, Request, Response } from 'express';

const localeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {    
    req.setLocale(req.param('locale', 'en'));
    next();
}

export { localeMiddleware }