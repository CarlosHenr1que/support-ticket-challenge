import { InvalidClientError } from '../core/entities/ticket/errors/invalid-client'
import { TicketProps } from '../core/entities/ticket/ticket'
import { TicketMongoRepository } from '../infra/repositories/ticket-mongo'
import { UpdateTicket } from './update-ticket'

const ticket: TicketProps = {
  id: 'any_id',
  client: 'Client A',
  issue: 'Issue A',
  status: 'open' as 'open' | 'closed',
  deadline: '2024-12-31',
  createdAt: '2024-12-31',
  updatedAt: '2024-12-31',
}

const makeSut = () => {
  const repository = new TicketMongoRepository()
  const sut = new UpdateTicket(repository)
  return { sut }
}
describe('Update ticket', () => {
  test('should return a updated ticket when valid params', async () => {
    const newClientName = 'Carlos Henrique'
    const ticketData = { ...ticket, client: newClientName }
    jest.spyOn(TicketMongoRepository.prototype, 'update').mockResolvedValueOnce(ticketData)
    const { sut } = makeSut()
    const result = await sut.execute(ticket)

    expect(result.isRight).toBeTruthy()
    expect(result.value).toBe(ticketData)
  })

  test('should return error when invalid params is passed', async () => {
    const invalidClient = ''
    const { sut } = makeSut()
    const result = await sut.execute({ ...ticket, client: invalidClient })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(InvalidClientError)
  })

  test('should return error id is not found', async () => {
    jest.spyOn(TicketMongoRepository.prototype, 'update').mockResolvedValueOnce(null)
    const { sut } = makeSut()
    const result = await sut.execute(ticket)

    expect(result.value).toBeInstanceOf(Error)
    expect(result.isLeft()).toBeTruthy()
  })
})
