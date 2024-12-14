import TicketRepository from '../core/repositories/ticket-repository'
export class GetTickets {
  constructor(private ticketRepository: TicketRepository) {
    this.ticketRepository = ticketRepository
  }
  async execute() {
    return await this.ticketRepository.loadAll()
  }
}
