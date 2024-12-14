import { UpdateTicket } from '../../use-cases/update-ticket'
import { UpdateTicketController } from './update-ticket'
import { TicketMongoRepository } from '../../infra/repositories/ticket-mongo'
import { InvalidClientError } from '../../core/entities/ticket/errors/invalid-client'
import { InvalidIssueError } from '../../core/entities/ticket/errors/invalid-issue'
import { InvalidStatusError } from '../../core/entities/ticket/errors/invalid-status'
import { InvalidDeadlineError } from '../../core/entities/ticket/errors/invalid-deadline'
import { right } from '../../shared/either'
import { TicketProps } from '../../core/entities/ticket/ticket'

const makeSut = () => {
  const ticketsRepository = new TicketMongoRepository()
  const updateTicket = new UpdateTicket(ticketsRepository)
  const sut = new UpdateTicketController(updateTicket)
  return { sut }
}

const createTicketParams = {
  id: '675d6b00e02313bd5beab1ed',
  client: 'John Doe',
  issue: 'Cannot access my account',
  status: 'open',
  deadline: '2024-12-15T18:00:00.000Z',
}

const createdTicket = {
  id: '675d6b00e02313bd5beab1ed',
  client: 'John Doe',
  issue: 'Cannot access my account',
  status: 'open',
  createdAt: '2024-12-14T11:24:48.984Z',
  updatedAt: '2024-12-14T11:24:48.984Z',
  deadline: '2024-12-15T18:00:00.000Z',
}

describe('Update ticket controller', () => {
  describe('Validate params', () => {
    test('should return 400 if no client is provided', async () => {
      const { sut } = makeSut()
      const emptyClient = ''
      const id = 'any_id_with_24_character'
      const httpResponse = await sut.handle({ body: { ...createTicketParams, client: emptyClient }, params: { id } })

      expect(httpResponse.body).toBe('Client is required.')
      expect(httpResponse.statusCode).toBe(400)
    })

    test('should return with invalid if is provided', async () => {
      const { sut } = makeSut()
      const id = ''
      const httpResponse = await sut.handle({ body: { ...createTicketParams }, params: { id } })

      expect(httpResponse.body).toBe('invalid id must be a 24 character hex string')
      expect(httpResponse.statusCode).toBe(400)
    })

    test('should return 400 if no client is issue', async () => {
      const { sut } = makeSut()
      const emptyIssue = ''
      const id = 'any_id_with_24_character'
      const httpResponse = await sut.handle({ body: { ...createTicketParams, issue: emptyIssue }, params: { id } })

      expect(httpResponse.body).toBe('Issue is required.')
      expect(httpResponse.statusCode).toBe(400)
    })

    test('should return 400 if no status is provided', async () => {
      const { sut } = makeSut()
      const emptyStatus = ''
      const id = 'any_id_with_24_character'
      const httpResponse = await sut.handle({ body: { ...createTicketParams, status: emptyStatus }, params: { id } })

      expect(httpResponse.body).toBe('Status is required.')
      expect(httpResponse.statusCode).toBe(400)
    })

    test('should return 400 if no deadline is provided', async () => {
      const { sut } = makeSut()
      const emptyDeadline = ''
      const id = 'any_id_with_24_character'
      const httpResponse = await sut.handle({
        body: { ...createTicketParams, deadline: emptyDeadline },
        params: { id },
      })

      expect(httpResponse.body).toBe('Deadline is required.')
      expect(httpResponse.statusCode).toBe(400)
    })

    test('should return 400 if invalid client is provided', async () => {
      const { sut } = makeSut()
      const invalidClient = 'a'
      const id = 'any_id_with_24_character'
      const httpResponse = await sut.handle({ body: { ...createTicketParams, client: invalidClient }, params: { id } })

      expect(httpResponse.body).toBe(new InvalidClientError(invalidClient).message)
      expect(httpResponse.statusCode).toBe(400)
    })

    test('should return 400 if invalid issue is provided', async () => {
      const { sut } = makeSut()
      const invalidIssue = 'a'
      const id = 'any_id_with_24_character'
      const httpResponse = await sut.handle({ body: { ...createTicketParams, issue: invalidIssue }, params: { id } })

      expect(httpResponse.body).toBe(new InvalidIssueError(invalidIssue).message)
      expect(httpResponse.statusCode).toBe(400)
    })

    test('should return 400 if invalid status is provided', async () => {
      const { sut } = makeSut()
      const invalidStatus = 'a'
      const id = 'any_id_with_24_character'
      const httpResponse = await sut.handle({ body: { ...createTicketParams, status: invalidStatus }, params: { id } })

      expect(httpResponse.body).toBe(new InvalidStatusError(invalidStatus).message)
      expect(httpResponse.statusCode).toBe(400)
    })

    test('should return 400 if invalid deadline is provided', async () => {
      const { sut } = makeSut()
      const invalidDeadline = 'a'
      const id = 'any_id_with_24_character'
      const httpResponse = await sut.handle({
        body: { ...createTicketParams, deadline: invalidDeadline },
        params: { id },
      })

      expect(httpResponse.body).toBe(new InvalidDeadlineError(invalidDeadline).message)
      expect(httpResponse.statusCode).toBe(400)
    })

    test('should return a ticket when valid params provided', async () => {
      const { sut } = makeSut()
      const id = 'any_id_with_24_character'
      jest
        .spyOn(UpdateTicket.prototype, 'execute')
        .mockResolvedValueOnce(right(createdTicket as unknown as TicketProps))
      const httpResponse = await sut.handle({ body: { ...createTicketParams }, params: { id } })

      expect(httpResponse.body).toBe(createdTicket)
      expect(httpResponse.statusCode).toBe(200)
    })

    test('should return 500 if update ticket throws', async () => {
      const { sut } = makeSut()
      const id = 'any_id_with_24_character'
      jest.spyOn(UpdateTicket.prototype, 'execute').mockImplementationOnce(() => {
        throw new Error()
      })
      const httpResponse = await sut.handle({ body: { ...createTicketParams }, params: { id } })

      expect(httpResponse.body).toBe('internal')
      expect(httpResponse.statusCode).toBe(500)
    })
  })
})
