import { ExpensesRepository } from './expenses.repository'
import { CreateExpenseDTO } from './dto/createExpense.dto'
import Expense from './entity/expense.entity'

export class ExpensesService {
  private repo = new ExpensesRepository()

  addExpense(dto: CreateExpenseDTO): Promise<Expense> {
    return this.repo.create(dto)
  }

  getExpenses(): Promise<Expense[]> {
    return this.repo.findAll()
  }

  getExpenseById(id: number): Promise<Expense | null> {
    return this.repo.findById(id)
  }
}
