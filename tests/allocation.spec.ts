import request from 'supertest'

const API_URL = 'http://localhost:3000'
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU2NzdlNGFhLWQ5ZDgtNDliMi1hYjUzLTg4NjJhMDBjNDRiYyIsImNhcmdvIjoiQURNIiwiaWF0IjoxNzQxMTI3MzQ4LCJleHAiOjE3NDExNTYxNDh9.5fC5eeNtj5hQl7_ITL2bIBcnHqPSTbA2cQnHzYqIwhg'

import { prisma } from '../src/lib/prisma-client'
describe('Allocation Services', () => {
  describe('POST /allocation', () => {
    it('Deve criar uma novasw alocação com sucesso', async () => {
      const cela = await prisma.cela.findFirst()
      const detento = await prisma.detento.findFirst()

      const response = await request(API_URL)
        .post('/allocation')
        .set('Authorization', `Bearer ${token}`)
        .send({
          celaId: cela?.id,
          detentoId: detento?.id,
        })
      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('id')
    })

    it('Deve retornar erro 404 se a cela não existir', async () => {
      const response = await request(API_URL)
        .post('/allocation')
        .set('Authorization', `Bearer ${token}`)
        .send({
          celaId: 'dcf97f3b-1acc-477d-b9e6-c78fac54f053',
          detentoId: '07d3f341-7af1-4b99-b82c-2bd017b5902a',
        })

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('error', 'Cela não encontrada')
    })

    it('Deve retornar erro 400 se a cela estiver lotada', async () => {
      const response = await request(API_URL)
        .post('/allocation')
        .set('Authorization', `Bearer ${token}`)
        .send({
          celaId: '0080ce99-9992-4712-9a77-5c7949224e6f',
          detentoId: '07d3f341-7af1-4b99-b82c-2bd017b5902a',
        })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty(
        'error',
        'Cela lotada. Não é possível alocar mais detentos.'
      )
    })

    it('Deve retornar erro 400 se o detento já estiver alocado', async () => {
      const detento = await prisma.detento.findFirst()

      const response = await request(API_URL)
        .post('/allocation')
        .set('Authorization', `Bearer ${token}`)
        .send({
          celaId: '70730458-130b-4f8b-be64-6fdb4f971ef1',
          detentoId: detento?.id,
        })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty(
        'error',
        'Detento já está alocado em uma cela.'
      )
    })
  })

  describe('GET All /allocations', () => {
    it('Deve listar todas as alocações', async () => {
      const response = await request(API_URL)
        .get('/allocation')
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
    })
  })

  describe('DELETE /allocation/:id', () => {
    it('Deve remover uma alocação com sucesso', async () => {
      const allocation = await prisma.alocacao.findFirst()
      const response = await request(API_URL)
        .delete(`/allocation/${allocation?.id}`)
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty(
        'message',
        'Alocação removida com sucesso'
      )
    })

    it('deve retornar que nao existe alocação', async () => {
      const response = await request(API_URL)
        .delete('/allocation/0e4ded0d-72d4-4754-9935-d074b626c914')
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('error')
    })
  })
})
