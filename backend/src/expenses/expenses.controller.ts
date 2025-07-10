import { Router, Request, Response, NextFunction } from 'express';
import { ExpenseQuery } from './types';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDTO } from './dto/createExpense.dto';
import { UpdateExpenseDTO } from './dto/updateExpense.dto';
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

router.get(
  '/',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limit     = req.query.limit   !== undefined ? Number(req.query.limit)  : undefined;
      const offset    = req.query.offset  !== undefined ? Number(req.query.offset) : undefined;
      const fromDateQ = req.query.fromDate ? new Date(String(req.query.fromDate))  : undefined;
      const toDateQ   = req.query.toDate   ? new Date(String(req.query.toDate))    : undefined;

      const badNumber = (n: unknown) => n !== undefined && Number.isNaN(n);
      const badDate   = (d?: Date) => d && Number.isNaN(d.getTime());

      if (
        badNumber(limit)  ||
        badNumber(offset) ||
        badDate(fromDateQ)||
        badDate(toDateQ)
      ) {
        res.status(400).json({ error: 'Bad query parameters' });
        return;
      }

      const query: ExpenseQuery = {
        limit,
        offset,
        fromDate: fromDateQ,
        toDate  : toDateQ,
      };

      const data = await service.getExpenses(query);

      res.status(200).json({
        data,
        pagination: { limit, offset },
      });
    } catch (err) {
      next(err);
    }
  },
);

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

router.patch(
  '/:id',
  validate(UpdateExpenseDTO),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    try {
      const dto = new UpdateExpenseDTO(req.body);
      const updated = await service.updateExpense(id, dto);

      if (!updated) {
        res.status(404).json({ error: 'Not found' });
        return;
      }

      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  },
);

router.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    try {
      const removed = await service.deleteExpense(id);

      if (!removed) {
        res.status(404).json({ error: 'Not found' });
        return;
      }

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
);

export default router;