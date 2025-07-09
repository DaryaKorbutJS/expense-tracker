import { Request, Response, NextFunction, RequestHandler } from 'express';

export const validate =
  (DTO: new (body: any) => unknown): RequestHandler =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = new DTO(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
