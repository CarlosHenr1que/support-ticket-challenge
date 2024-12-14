import { Deadline } from './deadline'
import { InvalidDeadlineError } from './errors/invalid-deadline'

describe('Deadline entity domain', () => {
  it('should return a Deadline instance when given a valid future date string', () => {
    const validFutureDate = new Date()
    validFutureDate.setDate(validFutureDate.getDate() + 1)

    const resultOrError = Deadline.create(validFutureDate.toISOString())

    expect(resultOrError.isRight()).toBe(true)
    expect(resultOrError.value).toBeInstanceOf(Deadline)
    expect((resultOrError.value as Deadline).value).toEqual(validFutureDate)
  })

  it('should return an InvalidDeadlineError when given an invalid date string', () => {
    const invalidDate = 'not-a-date'

    const resultOrError = Deadline.create(invalidDate)
    const deadline = resultOrError.value as Deadline

    expect(resultOrError.isLeft()).toBeTruthy()
    expect(deadline).toBeInstanceOf(InvalidDeadlineError)
    expect((resultOrError.value as Error).message).toBe(`The deadline "${invalidDate}" is invalid.`)
  })

  it('should return an InvalidDeadlineError when given an undefined value', () => {
    const invalidDate = undefined

    const resultOrError = Deadline.create(invalidDate as unknown as string)
    const deadline = resultOrError.value as Deadline

    expect(resultOrError.isLeft()).toBeTruthy()
    expect(deadline).toBeInstanceOf(InvalidDeadlineError)
    expect((resultOrError.value as Error).message).toBe(`The deadline "${invalidDate}" is invalid.`)
  })

  it('should return an InvalidDeadlineError when given a past date', () => {
    const pastDate = new Date()
    pastDate.setDate(pastDate.getDate() - 1)
    const result = Deadline.create(pastDate.toISOString()).value as Error

    expect(result).toBeInstanceOf(InvalidDeadlineError)
    expect(result.message).toBe(`The deadline "${pastDate.toISOString()}" is invalid.`)
  })
})
