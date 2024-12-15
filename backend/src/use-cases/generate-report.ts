import XLSX from 'xlsx'
import TicketRepository from '../core/repositories/ticket-repository'

export class GenerateTicketReport {
  constructor(private ticketRepository: TicketRepository) {
    this.ticketRepository = ticketRepository
  }
  async execute() {
    const tickets = await this.ticketRepository.loadAll()

    const data = tickets.map((ticket) => ({
      client: ticket.client,
      issue: ticket.issue,
      status: ticket.status,
    }))

    const ws = XLSX.utils.json_to_sheet(data)

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Tickets')

    const xlsxBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' })
    return xlsxBuffer
  }
}
