import { Either, left, right } from '../../../shared/either'
import { InvalidIssueError } from './errors/invalid-issue'

export class Issue {
  private readonly issue: string

  private constructor(issue: string) {
    this.issue = issue
    Object.freeze(this)
  }

  static create(issue: string): Either<InvalidIssueError, Issue> {
    if (!Issue.validate(issue)) {
      return left(new InvalidIssueError(issue))
    }
    return right(new Issue(issue))
  }

  get value(): string {
    return this.issue
  }

  static validate(issue: string): boolean {
    if (!issue || issue.trim().length < 2 || issue.trim().length > 255) {
      return false
    }
    return true
  }
}
