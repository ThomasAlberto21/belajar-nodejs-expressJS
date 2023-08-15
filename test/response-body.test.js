import express from 'express';
import request from 'supertest';

test('Response Body Test', async () => {
  const app = express();
  app.get('/', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.json({
      message: 'Hello John',
      data: {
        name: 'John',
        age: 20,
        hobby: 'Fishing',
        address: 'Jakarta',
        phone: '08123456789',
      },
    });
  });

  const response = await request(app).get('/');
  expect(response.get('Content-Type')).toContain('application/json');
  expect(response.body.message).toEqual('Hello John');
  expect(response.body.data.name).toEqual('John');
  expect(response.body.data.age).toEqual(20);
  expect(response.body.data.hobby).toEqual('Fishing');
  expect(response.body.data.address).toEqual('Jakarta');
  expect(response.body.data.phone).toEqual('08123456789');
});
