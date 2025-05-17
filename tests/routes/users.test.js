const supertest = require('supertest')
const mongoose = require('mongoose')
const { app, server } = require('../../src/app')

const api = supertest(app)

// Endpoints que devuelven HTML:
const htmlEndpoints = [
  '/',
  '/log_in',
  '/sign_in',
  '/search?q=a'
]

describe('Suite de integración de Endpoints', () => {
  // Hook para cerrar servidor y conexión a la BD al finalizar todos los tests
  afterAll(async () => {
    await new Promise(resolve => server.close(resolve))
    await mongoose.connection.close()
  })

  describe('POST /posts', () => {
    test('Debe responder 200 y { ok: true } sin payload explícito', async () => {
      const res = await api
        .post('/posts')
        // .send({ title: 'Test', body: 'Contenido' })
        .set('Accept', 'application/json')

      // Validamos el status y la estructura del body
      expect(res.status).toBe(200)
      expect(res.headers['content-type']).toMatch(/application\/json/)
      expect(res.body).toEqual({ ok: true })
    })

    test('Debe devolver JSON con la clave ok', async () => {
      const res = await api.post('/posts').set('Accept', 'application/json')
      expect(res.body).toHaveProperty('ok')
      expect(typeof res.body.ok).toBe('boolean')
    })
  })

  describe('GET HTML estático', () => {
    htmlEndpoints.forEach(path => {
      test(`GET ${path} → HTML válido (<!DOCTYPE html>)`, async () => {
        const res = await api.get(path)
        // Status y Content-Type
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/text\/html/)
        // Verificamos que inicie con el DOCTYPE
        expect(res.text.startsWith('<!DOCTYPE html>')).toBe(true)
      })
    })
  })
})
