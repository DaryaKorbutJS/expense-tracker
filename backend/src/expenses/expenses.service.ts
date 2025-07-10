import { ExpenseQuery } from './types';
import { ExpensesRepository } from './expenses.repository'
import { CreateExpenseDTO } from './dto/createExpense.dto'
import { UpdateExpenseDTO } from './dto/updateExpense.dto';
import Expense from './entity/expense.entity'

export class ExpensesService {
  private repo = new ExpensesRepository()

  addExpense(dto: CreateExpenseDTO): Promise<Expense> {
    return this.repo.create(dto)
  }

  getExpenses(q: ExpenseQuery = {}): Promise<Expense[]> {
    return this.repo.findAll(q);
  }

  getExpenseById(id: number): Promise<Expense | null> {
    return this.repo.findById(id)
  }

  updateExpense(
    id: number,
    dto: UpdateExpenseDTO,
  ): Promise<Expense | null> {
    const { date, ...rest } = dto;
    const data = {
      ...rest,
      ...(date ? { date: new Date(date) } : {}),
    };

    return this.repo.updateById(id, data);
  }

  deleteExpense(id: number): Promise<boolean> {
    return this.repo.deleteById(id);
  }
}
