import prisma from '../prisma/prisma.service'
import { CreateExpenseDTO } from './dto/createExpense.dto'
import Expense from './entity/expense.entity'

export class ExpensesRepository {
  async create(dto: CreateExpenseDTO): Promise<Expense> {
    const created = await prisma.expense.create({
      data: {
        name:     dto.name,
        amount:   dto.amount,
        currency: dto.currency,
        category: dto.category,
        date:     dto.date,
      },
    })
    return created
  }

  async findAll(): Promise<Expense[]> {
    return prisma.expense.findMany({
      orderBy: { date: 'desc' },
    })
  }

  async findById(id: number): Promise<Expense | null> {
    return prisma.expense.findUnique({
      where: { id },
    })
  }
}
