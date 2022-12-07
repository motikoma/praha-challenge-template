import { createRandomIdString } from 'src/util/random'

type EnrollmentStatus = 'enrolled' | 'absent' | 'seceder'

export class Participant {
  private constructor(
    private readonly id: string,
    private readonly name: ParticipantName,
    private readonly mailAddress: string,
    private readonly enrollmentStatus: EnrollmentStatus,
  ) {
    this.id = id
    this.name = name
    this.mailAddress = mailAddress
    this.enrollmentStatus = enrollmentStatus
  }

  static create(
    name: string,
    mailAddress: string,
    enrollmentStatus: EnrollmentStatus,
  ) {
    return new Participant(
      createRandomIdString(),
      name,
      mailAddress,
      enrollmentStatus,
    )
  }
}
