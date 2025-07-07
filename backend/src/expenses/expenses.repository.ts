import db from '../db/db.service';
import { CreateExpenseDTO } from './dto/createExpense.dto';
import Expense from './entity/expense.entity';

export class ExpensesRepository {
  create(dto: CreateExpenseDTO): Expense {
    const stmt = db.prepare(`
      INSERT INTO expenses (name, amount, currency, category, date)
      VALUES (@name, @amount, @currency, @category, @date)
    `);
    const info = stmt.run({
      name: dto.name,
      amount: dto.amount,
      currency: dto.currency,
      category: dto.category,
      date: dto.date.toISOString(),
    });
    return {
      id: info.lastInsertRowid as number,
      name: dto.name,
      amount: dto.amount,
      currency: dto.currency,
      category: dto.category,
      date: dto.date.toISOString(),
    };
  }

  findAll(): Expense[] {
    const stmt = db.prepare(`SELECT * FROM expenses ORDER BY date DESC`);
    return stmt.all() as Expense[];
  }

  findById(id: number): Expense | undefined {
    const stmt = db.prepare(`SELECT * FROM expenses WHERE id = ?`);
    return stmt.get(id) as Expense | undefined;
  }
}