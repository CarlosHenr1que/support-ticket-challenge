import { Ticket } from './ticket'
import { Client } from './client'
import { Issue } from './issue'
import { Status } from './status'
import { Deadline } from './deadline'
import { InvalidClientError } from './errors/invalid-client'
import { left } from '../../../shared/either'
import { InvalidIssueError } from './errors/invalid-issue'
import { InvalidStatusError } from './errors/invalid-status'
import { InvalidDeadlineError } from './errors/invalid-deadline'

const validProps = {
  client: 'Client A',
  issue: 'Issue A',
  status: 'open' as 'open' | 'closed',
  deadline: '2024-12-31',
  createdAt: '2024-12-31',
  updatedAt: '2024-12-31',
}
describe('Ticket entity domain', () => {
  it('should create a Ticket when all values are valid', () => {
    const result = Ticket.create(validProps)

    expect(result.isRight()).toBe(true)
    expect(result.value as Ticket).toBeInstanceOf(Ticket)
    expect((result.value as Ticket).client).toBeInstanceOf(Client)
    expect((result.value as Ticket).issue).toBeInstanceOf(Issue)
    expect((result.value as Ticket).status).toBeInstanceOf(Status)
    expect((result.value as Ticket).deadline).toBeInstanceOf(Deadline)
  })

  it('should not create a Ticket when client is not valid', () => {
    jest.spyOn(Client, 'create').mockImplementationOnce(() => left(new InvalidClientError('invalid client')))
    const result = Ticket.create({ ...validProps })
    expect(result.isLeft()).toBe(true)
  })
  it('should not create a Ticket when issue is not valid', () => {
    jest.spyOn(Issue, 'create').mockImplementationOnce(() => left(new InvalidIssueError('invalid issue')))
    const result = Ticket.create({ ...validProps })
    expect(result.isLeft()).toBe(true)
  })
  it('should not create a Ticket when status is not valid', () => {
    jest.spyOn(Status, 'create').mockImplementationOnce(() => left(new InvalidStatusError('invalid client')))
    const result = Ticket.create({ ...validProps })
    expect(result.isLeft()).toBe(true)
  })
  it('should not create a Ticket when deadline is not valid', () => {
    jest.spyOn(Deadline, 'create').mockImplementationOnce(() => left(new InvalidDeadlineError('invalid deadline')))
    const result = Ticket.create({ ...validProps })
    expect(result.isLeft()).toBe(true)
  })
})
