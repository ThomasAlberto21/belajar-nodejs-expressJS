import express from 'express';
import request from 'supertest';

const app = express();
const errorMiddleware = (err, req, res, next) => {
  res.status(500).send(`Error: ${err.message}`);
};

app.get('/', (req, res) => {
  throw new Error('Server Down');
});

app.use(errorMiddleware);

test('Test response body other', async () => {
  const response = await request(app).get('/');
  expect(response.status).toBe(500);
  expect(response.text).toContain('Error: Server Down');
});
