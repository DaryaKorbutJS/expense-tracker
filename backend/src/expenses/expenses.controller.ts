import express from 'express';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDTO } from './dto/createExpense.dto';

const router = express.Router();
const service = new ExpensesService();

router.post('/', (req, res) => {
  try {
    const dto = new CreateExpenseDTO(req.body);
    const expense = service.addExpense(dto);
    res.status(201).json(expense);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', (req, res) => {
  const list = service.getExpenses();
  res.json(list);
});

router.get(
  '/:id',
  (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }
    try {
      const expense = service.getExpenseById(id);
      if (!expense) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      res.json(expense);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;