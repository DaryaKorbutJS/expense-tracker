import { Router, Request, Response, NextFunction } from 'express';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDTO } from './dto/createExpense.dto';
import { validate } from '../helpers/middlewares/validator';

const router = Router();
const service = new ExpensesService();

router.post(
  '/', 
  validate(CreateExpenseDTO), 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = new CreateExpenseDTO(req.body);
      const expense = await service.addExpense(dto);
      res.status(201).json(expense);
    } catch (err: any) {
      next(err);
    }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await service.getExpenses();
    res.json(list);
  } catch (err: any) {
    next(err);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid ID' });
    return;
  }
  try {
    const expense = await service.getExpenseById(id);
    if (!expense) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json(expense);
  } catch (err: any) {
    next(err);
  }
});

export default router;