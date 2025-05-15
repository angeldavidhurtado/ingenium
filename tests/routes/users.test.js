// const request = require('supertest')
const app = require('../../src/app')  // tu archivo express
const mongoose = require('mongoose')
// const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer
/*
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  await mongoose.connect(uri)
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})
*/
/*
describe('GET /users', () => {
  it('debe responder con 200 OK y devolver un array de usuarios', async () => {
    const response = await request(app).get('/users')
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })
})
*/

console.log('ok')
