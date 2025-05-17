const supertest = require('supertest')
const mongoose = require('mongoose')
const { app, server } = require('../../src/app')

const api = supertest(app)

test('POST /posts', async () => {
  const res = await api
    .post('/posts')
    // .send(payload)
    // .set('Accept', 'application/json')
  expect(res.status).toBe(200)
  expect(res.body).toEqual({ ok: true })
})

test('GET /', async () => {
  const res = await api.get('/')
  expect(res.text.substring(0, 15)).toBe('<!DOCTYPE html>')
})

test('GET /', async () => {
  const res = await api.get('/')
  expect(res.text.substring(0, 15)).toBe('<!DOCTYPE html>')
})

test('GET /log_in', async () => {
  const res = await api.get('/log_in')
  expect(res.text.substring(0, 15)).toBe('<!DOCTYPE html>')
})

test('GET /sign_in', async () => {
  const res = await api.get('/sign_in')
  expect(res.text.substring(0, 15)).toBe('<!DOCTYPE html>')
})

test('GET /search', async () => {
  const res = await api.get('/search?q=a')
  expect(res.text.substring(0, 15)).toBe('<!DOCTYPE html>')
})


afterAll(async () => {
  await new Promise(resolve => server.close(resolve));
  await mongoose.connection.close()
})
