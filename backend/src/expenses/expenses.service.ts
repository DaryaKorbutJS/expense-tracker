import { prisma } from '../db';
import { ExpenseEntity } from './entity/expense.entity';
import { CreateExpenseDto } from './dto/createExpense.dto';
import { UpdateExpenseDto } from './dto/updateExpense.dto';

export class ExpensesService {
    async getAll(): Promise<ExpenseEntity[]> {
        return prisma.expense.findMany();
    }

    async getById(id: number): Promise<ExpenseEntity | null> {
        return prisma.expense.findUnique({ where: { id } });
    }

    async create(data: CreateExpenseDto): Promise<ExpenseEntity> {
        return prisma.expense.create({
        data: { ...data, date: new Date(data.date) },
        });
    }

    async update(id: number, data: UpdateExpenseDto): Promise<ExpenseEntity> {
        const updateData: any = { ...data };
        if (data.date) updateData.date = new Date(data.date);
        return prisma.expense.update({ where: { id }, data: updateData });
    }

    async delete(id: number): Promise<void> {
        await prisma.expense.delete({ where: { id } });
    }
}
