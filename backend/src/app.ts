import express from 'express';
import expensesRouter from './expenses/expenses.controller';

const app = express();

app.use(express.json());

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.use('/expenses', expensesRouter);

export default app;
