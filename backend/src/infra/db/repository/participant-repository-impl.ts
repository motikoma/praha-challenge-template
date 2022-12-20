import { Prisma, PrismaClient } from '@prisma/client'
import { Participant } from 'src/domain/participant/participant'
import { IParticipantRepository } from 'src/domain/participant/participant-repository'

export class ParticipantRepository implements IParticipantRepository {
  constructor(private readonly prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  async save(participant: Participant): Promise<Participant> {
    const { values } = participant.getAllProperties()
    const savedParticipant = await this.prismaClient.participant.create({
      data: {
        name: values.name.fullName,
        mailAddress: values.mailAddress.mailAddress,
        enrollmentStatus: values.enrollmentStatus,
      },
    })

    const savedParticipantEntity = Participant.reconstruct({
      id: savedParticipant.id,
      values: {
        name: savedParticipant.name,
        mailAddress: savedParticipant.mailAddress,
        enrollmentStatus: savedParticipant.enrollmentStatus,
      },
    })

    return savedParticipantEntity
  }
}
