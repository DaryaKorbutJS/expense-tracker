import express from 'express';
import expensesRouter from './expenses/expenses.controller';
import { errorHandler } from './helpers/middlewares/errorHandler';
import { requestLogger } from './helpers/middlewares/requestLogger';
import { notFoundHandler } from './helpers/middlewares/notFound.middleware';

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.use('/expenses', expensesRouter);

app.use(notFoundHandler);

app.use(errorHandler);


export default app;
