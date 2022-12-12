import { uuid } from 'uuidv4'
import { AbstractValueObject } from '../domain/abstractValueObject'

type Props = {
  id: string
}

export class UniqueID extends AbstractValueObject<Props> {
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
