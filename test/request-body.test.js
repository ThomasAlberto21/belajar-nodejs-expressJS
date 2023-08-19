import express from 'express';
import request from 'supertest';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// JSON
app.post('/products', (req, res) => {
  const product = req.body.product;
  res.json({
    message: `Product ${product} created`,
  });
});

// FORM
app.post('/products', (req, res) => {
  const product = req.body.product;
  res.json({
    message: `Product ${product} created`,
  });
});


// TESTING
describe('Request body test', () => {
  test('Test request body JSON', async () => {
    const response = await request(app)
      .post('/products')
      .set('Content-Type', 'application/json')
      .send({ product: 'Apple' });
    expect(response.body).toEqual({
      message: 'Product Apple created',
    });
  });

  test('Test request body FORM', async () => {
    const response = await request(app)
      .post('/products')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send('product=Apple');
    expect(response.body).toEqual({
      message: 'Product Apple created',
    });
  });
});
