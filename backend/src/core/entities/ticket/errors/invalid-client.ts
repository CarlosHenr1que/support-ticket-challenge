export class InvalidClientError extends Error {
  constructor(client: string) {
    super(`The client "${client}" is invalid.`)
    this.name = 'InvalidClient'
  }
}
