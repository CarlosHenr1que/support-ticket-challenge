import { Either, left, right } from '../../../shared/either'
import { InvalidStatusError } from './errors/invalid-status'

export class Status {
  private readonly status: 'open' | 'closed'

  private constructor(status: 'open' | 'closed') {
    this.status = status
    Object.freeze(this)
  }

  static create(status: string): Either<InvalidStatusError, Status> {
    if (!Status.validate(status)) {
      return left(new InvalidStatusError(status))
    }
    return right(new Status(status as 'open' | 'closed'))
  }

  get value(): 'open' | 'closed' {
    return this.status
  }

  static validate(status: string): boolean {
    const validStatuses = ['open', 'closed']
    return validStatuses.includes(status)
  }
}
