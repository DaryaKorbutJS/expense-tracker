import { prisma } from '../db';

export class ExpensesRepository {
    getAll() {
        return prisma.expense.findMany();
    }

    getById(id: number) {
        return prisma.expense.findUnique({ where: { id } });
    }

    create(data: any) {
        return prisma.expense.create({ data });
    }

    update(id: number, data: any) {
        return prisma.expense.update({ where: { id }, data });
    }

    delete(id: number) {
        return prisma.expense.delete({ where: { id } });
    }
}
