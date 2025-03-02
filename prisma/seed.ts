import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
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

  console.log('✅ Seed finalizado com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
