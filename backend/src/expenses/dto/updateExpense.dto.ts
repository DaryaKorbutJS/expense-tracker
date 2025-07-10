export class UpdateExpenseDTO {
  name?: string;
  amount?: number;
  currency?: string;
  category?: string;
  date?: string;

  constructor(partial: Partial<UpdateExpenseDTO>) {
    Object.assign(this, partial);
  }
}