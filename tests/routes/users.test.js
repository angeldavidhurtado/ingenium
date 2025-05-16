const supertest = require('supertest')
const mongoose = require('mongoose')
const { app, server } = require('../../src/app')

const api = supertest(app)

const suma = (a, b) => a + b
test('suma', () => {
  const result = suma(1, 2)
  expect(result).toBe(3)
})

test('debería responder { ok: true }', async () => {
  const payload = { foo: 'bar', ids: [1, 2, 3] };

  const res = await api
    .post('/posts')                     // path EXACTO
    .send(payload)                      // body JSON
    .set('Accept', 'application/json'); // header correcto

  // Logs para depuración
  console.log('status:', res.status);   // → 200
  console.log('body:  ', res.body);     // → { ok: true }

  expect(res.status).toBe(200);
  expect(res.body).toEqual({ ok: true });
});

afterAll(async () => {
  await new Promise(resolve => server.close(resolve));
  await mongoose.connection.close()
})
