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

describe('GET /expenses', () => {
  const seeded = {
    name: 'Unit-test-seed',
    amount: 9.99,
    currency: 'USD',
    category: 'Test',
    date: '2024-12-31T12:00:00.000Z',
  };

  beforeAll(async () => {
    await request(app).post('/expenses').send(seeded).expect(201);
  });

  it('returns 200 and an array of expenses', async () => {
    const res = await request(app).get('/expenses').expect(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('honours pagination (limit & offset)', async () => {
    const res = await request(app)
      .get('/expenses')
      .query({ limit: 1, offset: 0 })
      .expect(200);

    expect(res.body.data.length).toBeLessThanOrEqual(1);
    expect(res.body.pagination).toEqual({ limit: 1, offset: 0 });
  });

  it('filters by date range', async () => {
    const res = await request(app)
      .get('/expenses')
      .query({ fromDate: '2024-12-30', toDate: '2025-01-02' })
      .expect(200);

    const found = res.body.data.find((e: any) => e.name === seeded.name);
    expect(found).toBeDefined();

    res.body.data.forEach((e: any) => {
      const d = new Date(e.date).toISOString();
      expect(d >= new Date('2024-12-30').toISOString()).toBe(true);
      expect(d <= new Date('2025-01-02').toISOString()).toBe(true);
    });
  });
});