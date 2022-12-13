import { ParticipantName } from '../participantName'
import { Entity } from '../../entity'
import { MailAddress } from '../mailAddress'
import { UniqueID } from 'src/util/uniqueID'
import { DomainException } from 'src/domain/DomainException'

type EnrollmentStatus = 'enrolled' | 'absent' | 'seceder'

type Props = {
  id?: UniqueID
  values: ReadonlyValues
}
type ReadonlyProps = Readonly<Props>

type Values = {
  name: ParticipantName
  mailAddress: MailAddress
  enrollmentStatus: EnrollmentStatus
}
type ReadonlyValues = Readonly<Values>

export class Participant extends Entity<ReadonlyProps> {
  private constructor(props: ReadonlyProps) {
    super(props)
  }

  static create(props: ReadonlyProps): Participant {
    const { id } = props
    if (id) throw new DomainException("id can't be set")
    return new Participant(props)
  }
}
