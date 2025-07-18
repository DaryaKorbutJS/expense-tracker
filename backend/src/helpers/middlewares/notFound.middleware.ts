import { RequestHandler } from 'express';

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404);
  res.json({ error: 'Not Found' });
};