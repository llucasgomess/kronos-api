import request from 'supertest'
import { prisma } from './../src/lib/prisma-client'

const API_URL = 'http://localhost:3000'
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU2NzdlNGFhLWQ5ZDgtNDliMi1hYjUzLTg4NjJhMDBjNDRiYyIsImNhcmdvIjoiQURNIiwiaWF0IjoxNzQxMTI3MzQ4LCJleHAiOjE3NDExNTYxNDh9.5fC5eeNtj5hQl7_ITL2bIBcnHqPSTbA2cQnHzYqIwhg'

describe('Attorney Services', () => {
  describe('POST /attorney', () => {
    it('201 - cadastrar advogado', async () => {
      await prisma.advogado.delete({
        where: { oabNumero: '000014' },
      })
      const response = await request(API_URL)
        .post('/attorney')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'Elza 14',
          oabNumero: '000014',
        })
      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty(
        'message',
        'Advogado criado com sucesso'
      )
    })

    it('409 -  Advogado ja existe no banco dea dados', async () => {
      const response = await request(API_URL)
        .post('/attorney')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'Elza 15',
          oabNumero: '000015',
        })

      expect(response.status).toBe(409)
      expect(response.body).toHaveProperty('error')
    })
    it('400 -  Dados Invalidos', async () => {
      const response = await request(API_URL)
        .post('/attorney')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'Elza 15',
        })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
    })
  })

  describe('GET All /attorney', () => {
    it('200 - Deve listar todas os advogados', async () => {
      const response = await request(API_URL)
        .get('/attorney')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
    })
  })

  describe('GET By Id /attorney', () => {
    it('200 - Deve buscar por id o advogado', async () => {
      const response = await request(API_URL)
        .get('/attorney')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
    })

    it('404 - Advogado não existe', async () => {
      const response = await request(API_URL)
        .get('/attorney/9da6c2ba-8851-4549-8ac9-419e5e7ce532')
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('error')
    })
  })

  describe('UPDATE /attorney/:id', () => {
    it('200 - Deve atualizar o advogado', async () => {
      const response = await request(API_URL)
        .put(`/attorney/7294c25b-0025-4bb2-804f-e4e3061a8898`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'Elza da Silva Gomes',
          oabNumero: '000004',
        })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message')
    })
    it('404 - Advogado não existe', async () => {
      const response = await request(API_URL)
        .put('/attorney/9da6c2ba-8851-4549-8ac9-419e5e7ce532')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'Elza da Silva Gomes',
          oabNumero: '000035',
        })
      console.log(response.status, response.body)
      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('error')
    })
  })

  describe('DELETE /attorney/:id', () => {
    it('200 -  Deve deletar o advogado', async () => {
      const advogado = await prisma.advogado.create({
        data: {
          nome: 'Lucas da silva Gomes',
          oabNumero: '140589',
        },
      })

      const response = await request(API_URL)
        .delete(`/attorney/${advogado.id}`)
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message')
    })

    it('404 - Advogado não existe', async () => {
      const response = await request(API_URL)
        .delete('/attorney/9da6c2ba-8851-4549-8ac9-419e5e7ce532')
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('error')
    })
  })
})
