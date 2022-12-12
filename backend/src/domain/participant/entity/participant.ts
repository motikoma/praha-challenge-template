import { createRandomIdString } from 'src/util/random'
import { ParticipantName } from '../participantName'
import { AbstractEntity } from 'backend/src/domain/abstractEntity'

type EnrollmentStatus = 'enrolled' | 'absent' | 'seceder'

type Props = {
  id: string
  values: ReadonlyValues
}
type ReadonlyProps = Readonly<Props>

type Values = {
  name: ParticipantName
  mailAddress: MailAddress
  enrollmentStatus: EnrollmentStatus
}
type ReadonlyValues = Readonly<Values>

export class Participant extends AbstractEntity<ReadonlyProps> {
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
    name: ParticipantName,
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
