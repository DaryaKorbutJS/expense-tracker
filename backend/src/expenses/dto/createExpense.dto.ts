export class CreateExpenseDTO {
  name: string;
  amount: number;
  currency: string;
  category: string;
  date: Date;

  constructor(body: any) {
    if (!body.name || !body.amount || !body.currency || !body.category || !body.date) {
      throw new Error('Missing required fields');
    }
    this.name = String(body.name);
    this.amount = Number(body.amount);
    this.currency = String(body.currency);
    this.category = String(body.category);
    this.date = new Date(body.date);
    if (isNaN(this.date.getTime())) {
      throw new Error('Invalid date');
    }
  }
}