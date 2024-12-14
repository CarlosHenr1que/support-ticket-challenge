import { InvalidClientError } from '../core/entities/ticket/errors/invalid-client'
import { InvalidDeadlineError } from '../core/entities/ticket/errors/invalid-deadline'
import { InvalidIssueError } from '../core/entities/ticket/errors/invalid-issue'
import { InvalidStatusError } from '../core/entities/ticket/errors/invalid-status'
import { Ticket, TicketProps } from '../core/entities/ticket/ticket'
import TicketRepository from '../core/repositories/ticket-repository'

import { Either, left, right } from '../shared/either'

type Errors = InvalidClientError | InvalidIssueError | InvalidStatusError | InvalidDeadlineError
export class AddTicket {
  constructor(private ticketRepository: TicketRepository) {
    this.ticketRepository = ticketRepository
  }
  async execute(data: TicketProps): Promise<Either<Errors, TicketProps>> {
    const ticketOrError: Either<Errors, Ticket> = Ticket.create(data)
    if (ticketOrError.isLeft()) {
      return left(ticketOrError.value)
    }

    const ticket = ticketOrError.value
    const createdTicket = await this.ticketRepository.add(ticket)

    return right(createdTicket)
  }
}