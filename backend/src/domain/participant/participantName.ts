import { DomainError } from '../domainError'

export class ParticipantName {
  constructor(private readonly name: string) {
    if (!name) throw new DomainError('name is required')
    if (!name.length) throw new DomainError('name is required')
    this.name = name
  }

  public getName(): string {
    return this.name
  }
}
