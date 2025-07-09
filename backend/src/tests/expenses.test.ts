import request from 'supertest';
import app from '../app';

describe('POST /expenses', () => {
  it('should add a new expense and return it', async () => {
    const expenseData = {
      name: 'Lunch',
      amount: 15.5,
      currency: 'USD',
      category: 'Food',
      date: new Date().toISOString(),
    };

    const res = await request(app)
      .post('/expenses')
      .send(expenseData)
      .expect(201);

    expect(res.body).toMatchObject({
      name: expenseData.name,
      amount: expenseData.amount,
      currency: expenseData.currency,
      category: expenseData.category,
    });
    expect(new Date(res.body.date).toISOString()).toBe(expenseData.date);
    expect(res.body.id).toBeDefined();
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app)
      .post('/expenses')
      .send({})
      .expect(400);
    expect(res.body.error).toBeDefined();
  });
});
