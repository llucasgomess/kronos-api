import { faker } from '@faker-js/faker'
import { prisma } from '../src/lib/prisma-client'

function randomDateBetween(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

async function seed() {
  console.log('🧹 Limpando o banco de dados...')

  await prisma.visita.deleteMany({})
  await prisma.visitante.deleteMany({})
  await prisma.alocacao.deleteMany({})
  await prisma.detento.deleteMany({})
  await prisma.advogado.deleteMany({})
  await prisma.cela.deleteMany({})
  await prisma.usuario.deleteMany({})

  console.log('✅ Banco de dados limpo com sucesso!')
  console.log('🌱 Populando o banco de dados...')

  const celas = await Promise.all(
    Array.from({ length: 10 }).map((_, index) =>
      prisma.cela.create({
        data: {
          numero: index + 1,
          capacidade: 10,
          pavilhao: faker.helpers.arrayElement(['A', 'B', 'C']),
        },
      })
    )
  )
  console.log('🚔 Celas criadas no banco de dados...')

  const advogados = await Promise.all(
    Array.from({ length: 8 }).map(() =>
      prisma.advogado.create({
        data: {
          nome: faker.person.fullName(),
          oabNumero: faker.string.numeric(6),
        },
      })
    )
  )
  console.log('🚔 Advogados adicionados ao banco de dados...')

  const startDate = new Date('2025-01-01')
  const endDate = new Date()

  const detentos = await Promise.all(
    Array.from({ length: 120 }).map(async () => {
      const createdAt = randomDateBetween(startDate, endDate)

      const detento = await prisma.detento.create({
        data: {
          nome: faker.person.fullName(),
          idade: faker.number.int({ min: 18, max: 60 }),
          cpf: faker.string.numeric(11),
          filiacao: faker.person.fullName(),
          estadoCivil: faker.helpers.arrayElement([
            'Solteiro',
            'Casado',
            'Divorciado',
          ]),
          foto: faker.image.avatar(),
          reincidencia: faker.datatype.boolean(),
          createdAt,
        },
      })

      await prisma.alocacao.create({
        data: {
          detentoId: detento.id,
          celaId: faker.helpers.arrayElement(celas).id,
        },
      })

      // Criar 2 a 3 visitantes para cada detento
      const visitantes = await Promise.all(
        Array.from({ length: faker.number.int({ min: 2, max: 3 }) }).map(() =>
          prisma.visitante.create({
            data: {
              nome: faker.person.fullName(),
              cpf: faker.string.numeric(11),
              detentoId: detento.id,
              grauParentesco: faker.helpers.arrayElement([
                'Mãe',
                'Pai',
                'Irmão',
                'Esposa',
                'Filho',
              ]),
            },
          })
        )
      )

      return { detento, visitantes }
    })
  )

  console.log('🚔 Detentos adicionados ao banco de dados...')

  const visitaStart = new Date('2025-01-01')
  const visitaEnd = new Date('2025-04-30')

  // Criar 180 visitas no total, aleatoriamente distribuídas entre os detentos existentes
  for (let i = 0; i < 180; i++) {
    const { detento, visitantes } = faker.helpers.arrayElement(detentos)
    const visitante = faker.helpers.arrayElement(visitantes)
    const advogado = faker.helpers.maybe(
      () => faker.helpers.arrayElement(advogados).id
    )

    await prisma.visita.create({
      data: {
        detentoId: detento.id,
        visitanteId: visitante.id,
        advogadoId: advogado,
        dataVisita: randomDateBetween(visitaStart, visitaEnd),
      },
    })
  }

  console.log('🚔 Visitas adicionadas ao banco de dados...')

  await prisma.usuario.create({
    data: {
      nome: 'ADMINISTRADOR',
      cpf: '00000000001',
      senha: '$2a$10$5OEdaTFbCo6XTwIpSLejheoJklsnbYSe0.P8dyv9nnLkC7IcbgZ9e',
      email: 'adm@kronos.com.br',
      cargo: 'ADM',
      nivelPermissao: 10,
    },
  })
  console.log('🚔 usuario ADM adicionado ao banco de dados...')

  await prisma.usuario.create({
    data: {
      nome: 'INSPETOR MAROTO',
      cpf: '00000000002',
      email: 'insp@kronos.com.br',
      senha: '$2a$10$LhizKpZ5PTjFJgzfeKf2Suf6sMh9sLpwgxevJCXEO8edNRVcLW5ci',
      cargo: 'INSP',
      nivelPermissao: 5,
    },
  })
  console.log('🚔 usuario INSPETOR adicionado ao banco de dados...')
}

seed().then(() => {
  console.log('✅ Seed finalizado com sucesso!')
})
