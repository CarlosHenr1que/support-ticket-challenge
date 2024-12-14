import { AddTicket } from '../../use-cases/add-tickets'
import { AddTicketController } from './add-ticket'
import { TicketMongoRepository } from '../../infra/repositories/ticket-mongo'
import { right } from '../../shared/either'
import { TicketProps } from '../../core/entities/ticket/ticket'
import { InvalidClientError } from '../../core/entities/ticket/errors/invalid-client'
import { InvalidIssueError } from '../../core/entities/ticket/errors/invalid-issue'
import { InvalidStatusError } from '../../core/entities/ticket/errors/invalid-status'
import { InvalidDeadlineError } from '../../core/entities/ticket/errors/invalid-deadline'

const makeSut = () => {
  const ticketsRepository = new TicketMongoRepository()
  const addTicket = new AddTicket(ticketsRepository)
  const sut = new AddTicketController(addTicket)
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

describe('Add ticket controller', () => {
  describe('Validate params', () => {
    test('should return 400 if no client is provided', async () => {
      const { sut } = makeSut()
      const emptyClient = ''
      const httpResponse = await sut.handle({ body: { ...createTicketParams, client: emptyClient } })

      expect(httpResponse.body).toBe('Client is required.')
      expect(httpResponse.statusCode).toBe(400)
    })

    test('should return 400 if no client is issue', async () => {
      const { sut } = makeSut()
      const emptyIssue = ''
      const httpResponse = await sut.handle({ body: { ...createTicketParams, issue: emptyIssue } })

      expect(httpResponse.body).toBe('Issue is required.')
      expect(httpResponse.statusCode).toBe(400)
    })

    test('should return 400 if no status is provided', async () => {
      const { sut } = makeSut()
      const emptyStatus = ''
      const httpResponse = await sut.handle({ body: { ...createTicketParams, status: emptyStatus } })

      expect(httpResponse.body).toBe('Status is required.')
      expect(httpResponse.statusCode).toBe(400)
    })

    test('should return 400 if no deadline is provided', async () => {
      const { sut } = makeSut()
      const emptyDeadline = ''
      const httpResponse = await sut.handle({ body: { ...createTicketParams, deadline: emptyDeadline } })

      expect(httpResponse.body).toBe('Deadline is required.')
      expect(httpResponse.statusCode).toBe(400)
    })

    test('should return 400 if invalid client is provided', async () => {
      const { sut } = makeSut()
      const invalidClient = 'a'
      const httpResponse = await sut.handle({ body: { ...createTicketParams, client: invalidClient } })

      expect(httpResponse.body).toBe(new InvalidClientError(invalidClient).message)
      expect(httpResponse.statusCode).toBe(400)
    })

    test('should return 400 if invalid issue is provided', async () => {
      const { sut } = makeSut()
      const invalidIssue = 'a'
      const httpResponse = await sut.handle({ body: { ...createTicketParams, issue: invalidIssue } })

      expect(httpResponse.body).toBe(new InvalidIssueError(invalidIssue).message)
      expect(httpResponse.statusCode).toBe(400)
    })

    test('should return 400 if invalid status is provided', async () => {
      const { sut } = makeSut()
      const invalidStatus = 'a'
      const httpResponse = await sut.handle({ body: { ...createTicketParams, status: invalidStatus } })

      expect(httpResponse.body).toBe(new InvalidStatusError(invalidStatus).message)
      expect(httpResponse.statusCode).toBe(400)
    })

    test('should return 400 if invalid deadline is provided', async () => {
      const { sut } = makeSut()
      const invalidDeadline = 'a'
      const httpResponse = await sut.handle({ body: { ...createTicketParams, deadline: invalidDeadline } })

      expect(httpResponse.body).toBe(new InvalidDeadlineError(invalidDeadline).message)
      expect(httpResponse.statusCode).toBe(400)
    })
  })

  test('should return a ticket when valid params provided', async () => {
    const { sut } = makeSut()
    jest.spyOn(AddTicket.prototype, 'execute').mockResolvedValueOnce(right(createdTicket as unknown as TicketProps))
    const httpResponse = await sut.handle({ body: { ...createTicketParams } })

    expect(httpResponse.body).toBe(createdTicket)
    expect(httpResponse.statusCode).toBe(201)
  })

  test('should return 500 if add ticket throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(AddTicket.prototype, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle({ body: { ...createTicketParams } })

    expect(httpResponse.body).toBe('internal')
    expect(httpResponse.statusCode).toBe(500)
  })
})
