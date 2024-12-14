import { Status } from './status'
import { InvalidStatusError } from './errors/invalid-status'
describe('Status entity domain', () => {
  it('should create a Status when the status is valid', () => {
    const validStatus = 'open'

    const result = Status.create(validStatus)

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeInstanceOf(Status)
    expect((result.value as Status).value).toBe(validStatus)
  })

  it('should return InvalidStatusError when the status is invalid', () => {
    const invalidStatus = 'invalid' // invalid status

    const result = Status.create(invalidStatus)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidStatusError)
    expect((result.value as Error).message).toBe(`The status "${invalidStatus}" is invalid.`)
  })
})
