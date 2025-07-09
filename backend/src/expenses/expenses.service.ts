import { ExpenseQuery } from './types';
import { ExpensesRepository } from './expenses.repository'
import { CreateExpenseDTO } from './dto/createExpense.dto'
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
}
