import { ExpensesRepository } from './expenses.repository';
import { CreateExpenseDTO } from './dto/createExpense.dto';
import Expense from './entity/expense.entity';

export class ExpensesService {
  private repo = new ExpensesRepository();

  addExpense(dto: CreateExpenseDTO): Expense {
    return this.repo.create(dto);
  }

  getExpenses(): Expense[] {
    return this.repo.findAll();
  }

  getExpenseById(id: number): Expense | null {
    const e = this.repo.findById(id);
    return e ?? null;
  }
}