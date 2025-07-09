import { RequestHandler } from 'express';
import Logger from '../Logger';

export const requestLogger: RequestHandler = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const ms = Date.now() - start;
    const msg = `${req.method} ${req.originalUrl} → ${res.statusCode} (${ms} ms)`;

    if (res.statusCode >= 400) {
      Logger.error(msg);
    } else {
      Logger.info(msg);
    }
  });

  next();
};
