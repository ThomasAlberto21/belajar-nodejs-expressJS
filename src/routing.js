import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/user', (req, res) => {
  res.send('Hello User');
});

app.listen(3000, () => {
  console.log('Server on port 3000');
});
