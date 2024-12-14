import { Either, left, right } from '../../../shared/either'
import { InvalidClientError } from './errors/invalid-client'

export class Client {
  private readonly client: string

  private constructor(client: string) {
    this.client = client
    Object.freeze(this)
  }

  static create(client: string): Either<InvalidClientError, Client> {
    if (!Client.validate(client)) {
      return left(new InvalidClientError(client))
    }
    return right(new Client(client))
  }

  get value(): string {
    return this.client
  }

  static validate(client: string): boolean {
    if (!client || client.trim().length < 2 || client.trim().length > 255) {
      return false
    }
    return true
  }
}
