export class InvalidStatusError extends Error {
  constructor(status: string) {
    super(`The status "${status}" is invalid.`)
    this.name = 'InvalidStatus'
  }
}
