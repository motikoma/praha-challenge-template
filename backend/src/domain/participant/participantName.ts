import { Result, Ok, Err } from 'src/util/result'
import { AbstractValueObject } from '../abstractValueObject'
import { DomainError } from '../domainError'

interface Props {
  name: string
}

export class ParticipantName extends AbstractValueObject<Props> {
  // vscodeで引数名インライン表示にしたとしても引数が変わった場合の型エラーを検知できない危険がある
  // 上記の理由によりpropsで渡す
  private constructor(props: Props) {
    super(props)
  }

  // Result型を使いたいのでcreateメソッドを使用している
  static create(props: Props): Result<ParticipantName, DomainError> {
    if (!props.name) return new Err(new DomainError('name is required'))
    if (props.name.length === 0)
      return new Err(new DomainError('name is required'))
    return new Ok(new ParticipantName(props))
  }

  get name(): string {
    return this._value.name
  }
}
