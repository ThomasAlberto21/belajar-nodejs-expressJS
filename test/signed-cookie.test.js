import express from 'express';
import request from 'supertest';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser('SECRETKEYRAHASIA'));
app.use(express.json());

app.get('/', (req, res) => {
  const name = req.signedCookies['Login'];
  res.send(`Hello ${name}`);
});

app.post('/', (req, res) => {
  const name = req.body['name'];
  res.cookie('Login', name, { path: '/', signed: true });
  res.send(`Hello ${name}`);
});

describe('Cookie Test', () => {
  test('Test Read Cookie', async () => {
    const response = await request(app)
      .get('/')
      .set(
        'Cookie',
        'Login=s%3AThomas.OywOBWc0gokQJf2mqYL%2BeLTGm%2BrFEffISHbgJe47%2Fr8; Path=/'
      );
    expect(response.text).toBe('Hello Thomas');
  });

  test('Test Write Cookie', async () => {
    const response = await request(app).post('/').send({ name: 'Thomas' });
    expect(response.get('Set-Cookie').toString()).toContain('Thomas');
    expect(response.text).toEqual('Hello Thomas');
  });
});
