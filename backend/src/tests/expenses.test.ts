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

describe('GET /expenses/:id', () => {
  let createdId: number;

  beforeAll(async () => {
    const seed = {
      name: 'Get-by-ID-seed',
      amount: 42,
      currency: 'EUR',
      category: 'Test',
      date: '2025-01-01T00:00:00.000Z',
    };

    const res = await request(app).post('/expenses').send(seed).expect(201);
    createdId = res.body.id;
  });

  it('returns 200 and the correct expense for a valid ID', async () => {
    const res = await request(app).get(`/expenses/${createdId}`).expect(200);

    expect(res.body).toMatchObject({
      id: createdId,
      name: 'Get-by-ID-seed',
      amount: 42,
      currency: 'EUR',
      category: 'Test',
    });
  });

  it('returns 400 for a non-numeric ID', async () => {
    const res = await request(app).get('/expenses/not-a-number').expect(400);
    expect(res.body.error).toBeDefined();
  });

  it('returns 404 when the expense does not exist', async () => {
    const nonexistentId = createdId + 10_000;

    const res = await request(app).get(`/expenses/${nonexistentId}`).expect(404);
    expect(res.body.error).toBeDefined();
  });
});

describe('PATCH /expenses/:id', () => {
  let idToPatch: number;

  beforeEach(async () => {
    const seed = {
      name: 'Patch-me',
      amount: 5,
      currency: 'USD',
      category: 'Test',
      date: new Date().toISOString(),
    };

    const res = await request(app).post('/expenses').send(seed).expect(201);
    idToPatch = res.body.id;
  });

  it('returns 200 and updates the given fields', async () => {
    const payload = { name: 'Updated!', amount: 99.9 };

    const patchRes = await request(app)
      .patch(`/expenses/${idToPatch}`)
      .send(payload)
      .expect(200);

    expect(patchRes.body).toMatchObject({
      id: idToPatch,
      name: 'Updated!',
      amount: 99.9,
    });

    const getRes = await request(app).get(`/expenses/${idToPatch}`).expect(200);
    expect(getRes.body).toMatchObject({
      id: idToPatch,
      name: 'Updated!',
      amount: 99.9,
    });
  });

  it('returns 400 for a non-numeric ID', async () => {
    const res = await request(app)
      .patch('/expenses/not-a-number')
      .send({ name: 'x' })
      .expect(400);

    expect(res.body.error).toBeDefined();
  });

  it('returns 404 when the expense does not exist', async () => {
    const nonexistentId = idToPatch + 10_000;

    const res = await request(app)
      .patch(`/expenses/${nonexistentId}`)
      .send({ name: 'Ghost' })
      .expect(404);

    expect(res.body.error).toBeDefined();
  });

  it('returns 404 when the body has no updatable fields', async () => {
    const res = await request(app)
      .patch(`/expenses/${idToPatch}`)
      .send({})
      .expect(404);

    expect(res.body.error).toBeDefined();
  });
});

describe('DELETE /expenses/:id', () => {
  let idToDelete: number;

  beforeEach(async () => {
    const seed = {
      name: 'Delete-me',
      amount: 1,
      currency: 'USD',
      category: 'Test',
      date: new Date().toISOString(),
    };

    const res = await request(app).post('/expenses').send(seed).expect(201);
    idToDelete = res.body.id;
  });

  it('returns 204 when deletion is successful', async () => {
    await request(app).delete(`/expenses/${idToDelete}`).expect(204);
    await request(app).get(`/expenses/${idToDelete}`).expect(404);
  });

  it('returns 400 for a non-numeric ID', async () => {
    const res = await request(app).delete('/expenses/not-a-number').expect(400);
    expect(res.body.error).toBeDefined();
  });

  it('returns 404 when the expense does not exist', async () => {
    const nonexistentId = idToDelete + 10_000;

    const res = await request(app).delete(`/expenses/${nonexistentId}`).expect(404);
    expect(res.body.error).toBeDefined();
  });
});