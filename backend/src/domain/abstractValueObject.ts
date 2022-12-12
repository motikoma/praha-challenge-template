import { shallowEqual } from 'shallow-equal-object'

export abstract class AbstractValueObject<T> {
  protected constructor(protected readonly _value: T) {}

  equals(vo?: AbstractValueObject<T>): boolean {
    if (vo === null || vo === undefined) return false
    if (vo._value === undefined) return false
    return shallowEqual(this._value, vo._value)
  }
}
