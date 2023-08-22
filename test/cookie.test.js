import express from 'express';
import request from 'supertest';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  const name = req.cookies['name'];
  const author = req.cookies['author'];
  res.send(`Hello ${name} and ${author}`);
});

app.post('/', (req, res) => {
  const name = req.body['name'];
  res.cookie('Login', name, { path: '/' });
  res.send(`Hello ${name}`);
});

describe('Cookie Test', () => {
  test('Test Read Cookie', async () => {
    const response = await request(app)
      .get('/')
      .set('Cookie', 'name=Thomas;author=Riot');
    expect(response.text).toEqual('Hello Thomas and Riot');
  });

  test('Test Write Cookie', async () => {
    const response = await request(app).post('/').send({ name: 'Thomas' });
    expect(response.get('Set-Cookie').toString()).toContain('Thomas');
    expect(response.text).toEqual('Hello Thomas');
  });
});
