import express from 'express';
import request from 'supertest';

test('Response Test', async () => {
  const app = express();
  app.get('/', (req, res) => {
    res.set({
      'X-Powered-By': 'Thomas Alberto',
      'X-Author': 'Thomas',
    });
    res.send(`Hello Response`);
  });

  const response = await request(app).get('/');
  expect(response.get('X-Powered-By')).toBe('Thomas Alberto');
  expect(response.get('X-Author')).toBe('Thomas');
  expect(response.text).toEqual('Hello Response');
});
