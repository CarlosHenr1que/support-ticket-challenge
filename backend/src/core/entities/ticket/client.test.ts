import { Client } from './client'
import { InvalidClientError } from './errors/invalid-client'

describe('Client domain entity', () => {
  describe('create', () => {
    it('should return a client instance for a valid client name', () => {
      const validClientName = 'Valid Client'
      const result = Client.create(validClientName).value as Client
      expect(result).toBeInstanceOf(Client)
      expect(result.value).toBe(validClientName)
    })

    it('should return an InvalidClientError for an empty client name', () => {
      const emptyClientName = ''
      const result = Client.create(emptyClientName)

      expect(result.value).toBeInstanceOf(InvalidClientError)
      expect((result.value as Error).message).toBe(`The client "${emptyClientName}" is invalid.`)
    })

    it('should return an InvalidClientError for a client name that is too short', () => {
      const shortClientName = 'A'
      const result = Client.create(shortClientName)

      expect(result.value).toBeInstanceOf(InvalidClientError)
      expect((result.value as Error).message).toBe(`The client "${shortClientName}" is invalid.`)
    })

    it('should return an InvalidClientError for a client name that is too long', () => {
      const longClientName = 'A'.repeat(256)
      const result = Client.create(longClientName)

      expect(result.value).toBeInstanceOf(InvalidClientError)
      expect((result.value as Error).message).toBe(`The client "${longClientName}" is invalid.`)
    })
  })
})
