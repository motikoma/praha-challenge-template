import { uuid } from 'uuidv4'
import { ValueObject } from '../domain/valueObject'

type Props = {
  id: string
}

export class UniqueID extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props)
  }

  static create(): UniqueID {
    return new UniqueID({ id: uuid() })
  }

  get id(): string {
    return this._value.id
  }
}
