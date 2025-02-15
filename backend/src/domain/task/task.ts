import { UniqueID } from 'src/util/uniqueID'
import { DomainException } from '../domain-exception'
import { Entity } from '../entity'
import { TaskName } from './task-name'

export const TASK_STATUS = {
  TODO: '未着手',
  DOING: 'レビュー待ち',
  DONE: '完了',
} as const
export type TaskStatus = typeof TASK_STATUS[keyof typeof TASK_STATUS]

type Props = {
  id?: UniqueID
  values: ReadonlyValues
}
type ReadonlyProps = Readonly<Props>

type Values = {
  taskName: TaskName
  taskStatus: TaskStatus
  ownerId: UniqueID
}
type ReadonlyValues = Readonly<Values>
export class Task extends Entity<ReadonlyProps> {
  private constructor(props: ReadonlyProps) {
    super(props)
  }

  static create(values: ReadonlyValues): Task {
    const props = {
      id: UniqueID.create(),
      values,
    }
    return new Task(props)
  }

  static reconstruct(props: ReadonlyProps): Task {
    return new Task(props)
  }

  get taskStatus() {
    return this._values.taskStatus
  }

  changeTaskStatus(userId: UniqueID, newTaskStatus: TaskStatus): Task {
    if (!userId.equals(this._values.ownerId))
      throw new DomainException('課題のオーナー以外は状態を変更できません')
    if (this._values.taskStatus === TASK_STATUS.DONE)
      throw new DomainException('完了した課題のステータスは変更できません')
    return new Task({
      id: this._id,
      values: {
        taskName: this._values.taskName,
        taskStatus: newTaskStatus,
        ownerId: this._values.ownerId,
      },
    })
  }
}
