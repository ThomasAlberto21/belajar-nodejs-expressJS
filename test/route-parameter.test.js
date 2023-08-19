import express from 'express';
import request from 'supertest';

const app = express();
app.get('/products/:id', (req, res) => {
  const idProducts = req.params.id;
  res.send(`Product: ${idProducts}`);
});

app.get('/categories/:id(\\d+)', (req, res) => {
  const idCategories = req.params.id;
  res.send(`Categories : ${idCategories}`);
});

test('Route parameter test', async () => {
  let response = await request(app).get('/products/thomas');
  expect(response.text).toBe('Product: thomas');

  response = await request(app).get('/products/salah');
  expect(response.text).toBe('Product: salah');

  response = await request(app).get('/categories/1234');
  expect(response.text).toBe('Categories : 1234');

  response = await request(app).get('/categories/salahn');
  expect(response.status).toBe(404);
});
