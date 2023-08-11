import express from 'express';
import request from 'supertest';

test('Request Query Param Test', async () => {
  const app = express();
  app.get('/', (req, res) => {
    res.send(`Hello ${req.query.firstName} ${req.query.lastName}`);
  });

  const response = await request(app)
    .get('/')
    .query({ firstName: 'Thomas', lastName: 'Alberto' });

  expect(response.text).toEqual('Hello Thomas Alberto');
});
