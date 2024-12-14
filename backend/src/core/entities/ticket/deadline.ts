import { Either, left, right } from '../../../shared/either'
import { InvalidDeadlineError } from './errors/invalid-deadline'

export class Deadline {
  private readonly deadline: Date

  private constructor(deadline: Date) {
    this.deadline = deadline
    Object.freeze(this)
  }

  static create(deadline: string): Either<InvalidDeadlineError, Deadline> {
    if (!deadline) {
      return left(new InvalidDeadlineError(deadline))
    }
    const parsedDeadline = new Date(deadline)
    if (!Deadline.validate(parsedDeadline)) {
      return left(new InvalidDeadlineError(deadline))
    }
    return right(new Deadline(parsedDeadline))
  }

  get value(): Date {
    return this.deadline
  }

  static validate(deadline: Date): boolean {
    if (isNaN(deadline.getTime())) return false
    if (deadline <= new Date()) return false
    return true
  }
}
