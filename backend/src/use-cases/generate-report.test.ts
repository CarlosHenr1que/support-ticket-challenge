import { TicketProps } from '../core/entities/ticket/ticket'
import { TicketMongoRepository } from '../infra/repositories/ticket-mongo'
import { GenerateTicketReport } from './generate-report'

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
  const sut = new GenerateTicketReport(repository)
  return { sut }
}

describe('Generate ticket report', () => {
  test('should return a generated xlsx buffer report', async () => {
    jest.spyOn(TicketMongoRepository.prototype, 'loadAll').mockResolvedValueOnce(tickets)
    const { sut } = makeSut()
    const result = await sut.execute()

    expect(result).not.toBe(null)
  })
})
