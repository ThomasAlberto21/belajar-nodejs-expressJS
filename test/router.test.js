import express from 'express';
import request from 'supertest';

const app = express();

const router = express.Router();
router.use((req, res, next) => {
  console.log(`Receive request : ${req.originalUrl}`);
  next();
});

router.get('/products/a', (req, res) => {
  res.send('Products a');
});

describe('Router test', () => {
  test('Router test disabled', async () => {
    const response = await request(app).get('/products/a');
    expect(response.status).toBe(404);
  });

  test('Router test enabled', async () => {
    app.use(router);
    const response = await request(app).get('/products/a');
    expect(response.text).toBe('Products a');
  });
});
