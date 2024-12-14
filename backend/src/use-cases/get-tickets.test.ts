import { TicketProps } from '../core/entities/ticket/ticket'
import { TicketMongoRepository } from '../infra/repositories/ticket-mongo'
import { GetTickets } from './get-tickets'

const tickets: TicketProps[] = [
  {
    client: 'Client A',
    issue: 'Issue A',
    status: 'open' as 'open' | 'closed',
    deadline: '2024-12-31',
    createdAt: '2024-12-31',
    updatedAt: '2024-12-31',
  },
  {
    client: 'Client A',
    issue: 'Issue A',
    status: 'open' as 'open' | 'closed',
    deadline: '2024-12-31',
    createdAt: '2024-12-31',
    updatedAt: '2024-12-31',
  },
]
const makeSut = () => {
  const repository = new TicketMongoRepository()
  const sut = new GetTickets(repository)
  return { sut }
}
describe('Get ticket', () => {
  test('should return a list of ticket when valid params', async () => {
    jest.spyOn(TicketMongoRepository.prototype, 'loadAll').mockResolvedValueOnce(tickets)
    const { sut } = makeSut()
    const result = await sut.execute()

    expect(result).toBe(tickets)
  })
})
