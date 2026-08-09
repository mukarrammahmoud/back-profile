import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

let app: typeof import('../src/app').default;
beforeAll(async () => {
  process.env.DATABASE_URL ??= 'postgresql://postgres:postgres@localhost:5432/portfolio';
  process.env.JWT_SECRET ??= 'test-secret-that-is-long-enough-for-validation-123';
  process.env.APP_URL ??= 'http://localhost:3000';
  ({ default: app } = await import('../src/app'));
});

afterAll(async () => {
  const { default: prisma, pool } = await import('../src/lib/prisma');
  await prisma.$disconnect();
  await pool.end();
});

describe('health endpoint', () => {
  it('returns ok', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.data ?? response.body.status).toBeTruthy();
  });
});
