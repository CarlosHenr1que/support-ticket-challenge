import { Ticket } from '../../core/entities/ticket/ticket'
import TicketModel from '../model/ticket'
import { TicketMongoRepository } from './ticket-mongo'

const tickets = [
  {
    id: 'any_id',
    client: 'Client A',
    issue: 'Issue A',
    status: 'open' as 'open' | 'closed',
    deadline: new Date(new Date().setDate(new Date().getDate() + 2)),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const makeSut = () => {
  const sut = new TicketMongoRepository()
  return { sut }
}
describe('Ticket mongo repository', () => {
  it('should return a list of tickets', async () => {
    const { sut } = makeSut()
    jest.spyOn(TicketModel, 'find').mockReturnValue({ sort: () => tickets } as never)

    const result = await sut.loadAll()
    const resultTicket = result[0]
    const mockedTicket = tickets[0]

    expect(resultTicket.id).toBe(mockedTicket.id)
    expect(resultTicket.client).toBe(mockedTicket.client)
    expect(resultTicket.issue).toBe(mockedTicket.issue)
    expect(resultTicket.status).toBe(mockedTicket.status)
    expect(resultTicket.deadline).toBe(mockedTicket.deadline.toISOString())
    expect(resultTicket.updatedAt).toBe(mockedTicket.updatedAt.toISOString())
    expect(resultTicket.createdAt).toBe(mockedTicket.createdAt.toISOString())
  })

  it('should return a ticket when created', async () => {
    const { sut } = makeSut()
    const ticket = tickets[0]
    jest.spyOn(TicketModel.prototype, 'save').mockResolvedValue(ticket as never)
    const result = await sut.add(
      Ticket.create({
        client: ticket.client,
        issue: ticket.issue,
        status: ticket.status,
        deadline: ticket.deadline.toISOString(),
      }).value as unknown as Ticket,
    )
    expect(result.client).toBe(ticket.client)
    expect(result.issue).toBe(ticket.issue)
    expect(result.status).toBe(ticket.status)
    expect(result.deadline).toBe(ticket.deadline.toISOString())
    expect(result.updatedAt).toBe(ticket.updatedAt.toISOString())
    expect(result.createdAt).toBe(ticket.createdAt.toISOString())
  })

  it('should return a ticket when updated', async () => {
    const { sut } = makeSut()
    const ticket = tickets[0]
    const newClient = 'Carlos Henrique'
    jest.spyOn(TicketModel, 'findByIdAndUpdate').mockResolvedValue({ ...ticket, client: newClient })
    const result = await sut.update(
      Ticket.create({
        client: ticket.client,
        issue: ticket.issue,
        status: ticket.status,
        deadline: ticket.deadline.toISOString(),
      }).value as unknown as Ticket,
    )
    expect(result?.client).toBe(newClient)
    expect(result?.issue).toBe(ticket.issue)
    expect(result?.status).toBe(ticket.status)
    expect(result?.deadline).toBe(ticket.deadline.toISOString())
    expect(result?.updatedAt).toBe(ticket.updatedAt.toISOString())
    expect(result?.createdAt).toBe(ticket.createdAt.toISOString())
  })

  it('should not return when id not found', async () => {
    const { sut } = makeSut()
    const ticket = tickets[0]
    jest.spyOn(TicketModel, 'findByIdAndUpdate').mockResolvedValue(null)
    const result = await sut.update(
      Ticket.create({
        client: ticket.client,
        issue: ticket.issue,
        status: ticket.status,
        deadline: ticket.deadline.toISOString(),
      }).value as unknown as Ticket,
    )
    expect(result).toBeNull()
  })
})
