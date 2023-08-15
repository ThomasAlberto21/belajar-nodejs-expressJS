import express from 'express';
import request from 'supertest';

const logger = (req, res, next) => {
  console.info(`Receive request: ${req.method} ${req.originalUrl}`);
  next();
};

const addPowerHeader = (req, res, next) => {
  res.set('X-Powered-By', 'Thomas Alberto');
  next();
};

const apiKeyMiddleware = (req, res, next) => {
  if (req.query.apiKey) {
    next();
  } else {
    res.status(401).end();
  }
};

const requestTimeMiddleware = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

const app = express();
app.use(logger);
app.use(addPowerHeader);
app.use(apiKeyMiddleware);
app.use(requestTimeMiddleware);

app.get('/', (req, res) => {
  res.send(`Hello Response`);
});

app.get('/thomas', (req, res) => {
  res.send(`Hello Thomas`);
});

app.get('/time', (req, res) => {
  res.send(`Hello, today is ${req.requestTime}`);
});

test('Test Response Middleware', async () => {
  const response = await request(app).get('/').query({ apiKey: '123' });
  expect(response.get('X-Powered-By')).toBe('Thomas Alberto');
  expect(response.text).toBe('Hello Response');
});

test('Test Response Middleware 2', async () => {
  const response = await request(app).get('/thomas').query({ apiKey: '123' });
  expect(response.get('X-Powered-By')).toBe('Thomas Alberto');
  expect(response.text).toBe('Hello Thomas');
});

test('Test Response Middleware Unauthorized', async () => {
  const response = await request(app).get('/thomas');
  expect(response.status).toBe(401);
});

test('Test Response Middleware time', async () => {
  const response = await request(app).get('/time').query({ apiKey: '123' });
  expect(response.get('X-Powered-By')).toBe('Thomas Alberto');
  expect(response.text).toContain('Hello, today is');
});
