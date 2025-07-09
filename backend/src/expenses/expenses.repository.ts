import prisma from '../prisma/prisma.service'
import { ExpenseQuery } from './types';
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

  async findAll(q: ExpenseQuery = {}): Promise<Expense[]> {
    const { limit, offset, fromDate, toDate } = q;

    return prisma.expense.findMany({
      take : limit,
      skip : offset,
      orderBy: { date: 'desc' },
      where: {
        ...(fromDate || toDate
          ? { date: { gte: fromDate ?? undefined, lte: toDate ?? undefined } }
          : {}),
      },
    });
  }

  async findById(id: number): Promise<Expense | null> {
    return prisma.expense.findUnique({
      where: { id },
    })
  }
}
