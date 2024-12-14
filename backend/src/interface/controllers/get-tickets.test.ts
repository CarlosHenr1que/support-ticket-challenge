import { GetTickets } from '../../use-cases/get-tickets'
import { GetTicketsController } from './get-tickets'
import { TicketMongoRepository } from '../../infra/repositories/ticket-mongo'
import { right } from '../../shared/either'
import { TicketProps } from '../../core/entities/ticket/ticket'

const makeSut = () => {
  const ticketsRepository = new TicketMongoRepository()
  const getTickets = new GetTickets(ticketsRepository)
  const sut = new GetTicketsController(getTickets)
  return { sut }
}

const tickets = [
  {
    id: '675d6b00e02313bd5beab1ed',
    client: 'John Doe',
    issue: 'Cannot access my account',
    status: 'open',
    createdAt: '2024-12-14T11:24:48.984Z',
    updatedAt: '2024-12-14T11:24:48.984Z',
    deadline: '2024-12-15T18:00:00.000Z',
  },
  {
    id: '675d6b00e02313bd5beab1ed',
    client: 'John Doe',
    issue: 'Cannot access my account',
    status: 'open',
    createdAt: '2024-12-14T11:24:48.984Z',
    updatedAt: '2024-12-14T11:24:48.984Z',
    deadline: '2024-12-15T18:00:00.000Z',
  },
]

describe('Get ticket controller', () => {
  test('should return list of tickets', async () => {
    const { sut } = makeSut()
    jest.spyOn(GetTickets.prototype, 'execute').mockResolvedValueOnce(right(tickets).value as unknown as TicketProps[])
    const httpResponse = await sut.handle()
    expect(httpResponse.body).toBe(tickets)
    expect(httpResponse.statusCode).toBe(200)
  })

  test('should return 500 if get tickets throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(GetTickets.prototype, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle()

    expect(httpResponse.body).toBe('internal')
    expect(httpResponse.statusCode).toBe(500)
  })
})
