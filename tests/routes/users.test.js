const supertest = require('supertest')
const mongoose = require('mongoose')
const { app, server } = require('../../src/app')

const api = supertest(app)

const suma = (a, b) => a + b
test('suma', async () => {
  const result = suma(1, 2)
  expect(result).toBe(3)
})

afterAll(async () => {
  await new Promise(resolve => server.close(resolve));
  await mongoose.connection.close()
})
