import { InvalidClientError } from '../core/entities/ticket/errors/invalid-client'
import { TicketProps } from '../core/entities/ticket/ticket'
import { TicketMongoRepository } from '../infra/repositories/ticket-mongo'
import { AddTicket } from './add-tickets'

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
  const sut = new AddTicket(repository)
  return { sut }
}

describe('Add ticket', () => {
  test('should return a ticket when valid params', async () => {
    jest
      .spyOn(TicketMongoRepository.prototype, 'add')
      .mockImplementationOnce(() => new Promise((resolve) => resolve(ticket)))

    const { sut } = makeSut()
    const result = await sut.execute(ticket)

    expect(result.isRight).toBeTruthy()
    expect(result.value).toBe(ticket)
  })

  test('should return error when a invalid params is passed', async () => {
    const invalidClient = ''
    const { sut } = makeSut()
    const result = await sut.execute({ ...ticket, client: invalidClient })

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toBeInstanceOf(InvalidClientError)
  })
})
