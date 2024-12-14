import { Either, left, right } from '../../../shared/either'
import { Client } from './client'
import { Deadline } from './deadline'
import { InvalidClientError } from './errors/invalid-client'
import { InvalidDeadlineError } from './errors/invalid-deadline'
import { InvalidIssueError } from './errors/invalid-issue'
import { InvalidStatusError } from './errors/invalid-status'
import { Issue } from './issue'
import { Status } from './status'

export interface TicketProps {
  id?: string
  client: string
  issue: string
  status: 'open' | 'closed'
  deadline: string
  createdAt?: string
  updatedAt?: string
}

export class Ticket {
  public readonly id: string | undefined
  public readonly client: Client
  public readonly issue: Issue
  public readonly status: Status
  public readonly deadline: Deadline
  public readonly createdAt?: Date | undefined
  public readonly updatedAt?: Date | undefined

  private constructor(
    id: string | undefined,
    client: Client,
    issue: Issue,
    status: Status,
    deadline: Deadline,
    createdAt: Date | undefined,
    updatedAt: Date | undefined,
  ) {
    this.id = id
    this.client = client
    this.issue = issue
    this.status = status
    this.deadline = deadline
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    Object.freeze(this)
  }

  static create(
    props: TicketProps,
  ): Either<InvalidClientError | InvalidIssueError | InvalidStatusError | InvalidDeadlineError, Ticket> {
    const clientOrError: Either<InvalidClientError, Client> = Client.create(props.client)
    if (clientOrError.isLeft()) {
      return left(clientOrError.value)
    }

    const issueOrError: Either<InvalidIssueError, Issue> = Issue.create(props.issue)
    if (issueOrError.isLeft()) {
      return left(issueOrError.value)
    }

    const statusOrError: Either<InvalidStatusError, Status> = Status.create(props.status)
    if (statusOrError.isLeft()) {
      return left(statusOrError.value)
    }

    const deadlineOrError: Either<InvalidDeadlineError, Deadline> = Deadline.create(props.deadline)
    if (deadlineOrError.isLeft()) {
      return left(deadlineOrError.value)
    }

    const client = clientOrError.value
    const issue = issueOrError.value
    const status = statusOrError.value
    const deadline = deadlineOrError.value

    return right(
      new Ticket(props.id, client, issue, status, deadline, new Date(props.createdAt!), new Date(props.updatedAt!)),
    )
  }
}
