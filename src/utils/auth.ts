import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET || 'chaveSuperSecreta'

// Gerar token JWT
export function gerarToken(id: string, cargo: string) {
  return jwt.sign({ id, cargo }, SECRET_KEY, { expiresIn: '8h' })
}

// Verificar senha
export function verificarSenha(senha: string, hash: string) {
  return bcrypt.compareSync(senha, hash)
}
