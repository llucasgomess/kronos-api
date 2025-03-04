import request from 'supertest'

describe('POST /login', () => {
  it('Deve retornar um token ao fazer login com credenciais corretas', async () => {
    const response = await request('http://localhost:3000')
      .post('/login')
      .send({ cpf: '00303065230', senha: '12345678' })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message', 'Login autenticado')
    expect(response.body).toHaveProperty('token')
    expect(typeof response.body.token).toBe('string') // Verifica se o token é uma string JWT
  })

  it('Deve retornar erro 401 para credenciais inválidas', async () => {
    const response = await request('http://localhost:3000')
      .post('/login')
      .send({ cpf: '00303065230', senha: '12345679' })

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error', 'Credenciais inválidas')
  })
})
