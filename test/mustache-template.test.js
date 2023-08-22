import express from 'express';
import request from 'supertest';
import mustacheExpress from 'mustache-express';

const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', mustacheExpress());

app.get('/', (req, res) => {
  res.render('index', {
    name: 'John Doe',
    country: 'Indonesia',
  });
});

test('Test Mustache', async () => {
  const response = await request(app).get('/');
  console.info(response.text);
  expect(response.text).toContain('John Doe');
  expect(response.text).toContain('Indonesia');
});
