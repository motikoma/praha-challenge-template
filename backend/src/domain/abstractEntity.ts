import { Err, Ok, Result } from 'src/util/result'
import { UniqueID } from '../util/uniqueID'
import { DomainError } from './domainError'

// https://zenn.dev/miyanokomiya/articles/534c9008627aa7
type Props = {
  id?: UniqueID
  values: {
    [key: string]: unknown
  }
}

export abstract class Entity<T extends Props> {
  protected readonly _id: UniqueID
  protected readonly _values: T['values']

  protected constructor(props: Props) {
    this._id = props.id ? props.id : UniqueID.create()
    this._values = props.values
  }

  equals(object: Entity<T>): boolean {
    return this._id.equals(object._id)
  }
}

/**
 * 使い方
 */
// type AnimalProps = {
//   id?: UniqueID
//   values: ReadonlyValues
// }
// // ReadOnlyが再起的にかからないので、再帰的にかけるようにするライブラリを作りたい
// type Values = {
//   name: string
//   age: number
// }
// type ReadonlyAnimalProps = Readonly<AnimalProps>
// type ReadonlyValues = Readonly<Values>

// class Animal extends Entity<ReadonlyAnimalProps> {
//   private constructor(props: Props) {
//     super(props)
//   }

//   static create(props: ReadonlyAnimalProps): Result<Animal, DomainError> {
//     // 書き換えられないようになった
//     // props.values = { ...props.values, age: 5 }
//     // props.values.name = 'cat'

//     const { id, values } = props
//     if (id) return new Err(new DomainError("id can't be set"))
//     if (values.name.length === 0)
//       return new Err(new DomainError('name is required'))

//     return new Ok(new Animal(props))
//   }

//   get name() {
//     return this._values.name
//   }
// }

// const dog = Animal.create({
//   id: UniqueID.create(),
//   values: {
//     name: 'dog',
//     age: 3,
//   },
// })

// const dog2 = Animal.create({
//   values: {
//     name: 'dog',
//     age: 3,
//   },
// })
