import express from 'express';
import request from 'supertest';

const app = express();
// app.use(express.static(__dirname + '/static'));
app.use('/static', express.static(__dirname + '/static')); // Prefix
app.get('/', (req, res) => {
  res.send('Hello Response');
});

app.get('/contoh.txt', (req, res) => {
  res.send('Hello Response');
});

describe('Static File Testing', () => {
  test('Test Static File', async () => {
    const response = await request(app).get('/');
    expect(response.text).toContain('Hello Response');
  });

  test('Test Static File contoh.txt', async () => {
    const response = await request(app).get('/contoh.txt');
    expect(response.text).toContain('Hello Response');
  });
});
