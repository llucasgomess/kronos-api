import { faker } from '@faker-js/faker'
import { prisma } from '../src/lib/prisma-client'

async function seed() {
  console.log('🧹 Limpando o banco de dados...')

  // Desabilitar verificações de chave estrangeira (opcional, dependendo do banco de dados)

  // Deletar dados em todas as tabelas (ajustar a ordem se necessário, para evitar problemas de dependência)
  await prisma.visita.deleteMany({})
  await prisma.visitante.deleteMany({})
  await prisma.alocacao.deleteMany({})
  await prisma.detento.deleteMany({})
  await prisma.advogado.deleteMany({})
  await prisma.cela.deleteMany({})
  await prisma.usuario.deleteMany({})

  // Reabilitar verificações de chave estrangeira (opcional)

  console.log('✅ Banco de dados limpo com sucesso!')

  console.log('🌱 Populando o banco de dados...')

  // Criar 10 celas com capacidade de 10 presos cada

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

  // Criar 8 advogados
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
  console.log('🚔 Advogado adicionados ao banco de dados...')

  // Criar 35 detentos e alocá-los em celas
  const detentos = await Promise.all(
    Array.from({ length: 35 }).map(async () => {
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
        },
      })

      // Atribuir o detento a uma cela aleatória
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

      // Criar visitas associadas ao detento
      await Promise.all(
        visitantes.map((visitante) =>
          prisma.visita.create({
            data: {
              detentoId: detento.id,
              visitanteId: visitante.id,
              advogadoId: faker.helpers.maybe(
                () => faker.helpers.arrayElement(advogados).id
              ), // Algumas visitas podem ter advogados
              dataVisita: faker.date.recent(),
            },
          })
        )
      )

      return detento
    })
  )
  console.log('🚔 Detentos adicionados ao banco de dados...')

  await prisma.usuario.create({
    data: {
      nome: 'ADM CAXIAS',
      cpf: '00000000001',
      senha: '$2a$10$5OEdaTFbCo6XTwIpSLejheoJklsnbYSe0.P8dyv9nnLkC7IcbgZ9e',
      cargo: 'ADM',
      nivelPermissao: 10,
    },
  })
  console.log('🚔 usuario ADM adicionado ao banco de dados...')

  await prisma.usuario.create({
    data: {
      nome: 'INSPETOR MAROTO',
      cpf: '00000000002',
      senha: '$2a$10$LhizKpZ5PTjFJgzfeKf2Suf6sMh9sLpwgxevJCXEO8edNRVcLW5ci',
      cargo: 'INSP',
      nivelPermissao: 5,
    },
  })
  console.log('🚔 usuario ADM adicionado ao banco de dados...')
}

seed().then(() => {
  console.log('✅ Seed finalizado com sucesso!')
})
