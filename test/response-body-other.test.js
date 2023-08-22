import express from 'express';
import request from 'supertest';

const app = express();
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/contoh.txt');
});

test('Test response body other', async () => {
  const response = await request(app).get('/');
  expect(response.text).toContain('Ini contoh send file');
});
