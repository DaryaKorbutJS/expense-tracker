import {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';
import Logger from '../Logger';

export const errorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  Logger.error(err);

  if (err instanceof Error) {
    res.status(400).json({ error: err.message });
    return;
  }

  res.status(500).json({ error: 'Internal server error' });
};
