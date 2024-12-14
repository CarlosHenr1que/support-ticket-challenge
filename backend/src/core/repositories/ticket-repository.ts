import { Ticket, TicketProps } from '../entities/ticket/ticket'

export default interface TicketRepository {
  loadAll(): Promise<TicketProps[]>
  add(data: Ticket): Promise<TicketProps>
  update(data: Ticket): Promise<TicketProps | null>
}
