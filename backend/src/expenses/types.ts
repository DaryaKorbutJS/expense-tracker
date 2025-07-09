export interface ExpenseQuery {
  limit?: number;
  offset?: number;
  fromDate?: Date;
  toDate?: Date;
}