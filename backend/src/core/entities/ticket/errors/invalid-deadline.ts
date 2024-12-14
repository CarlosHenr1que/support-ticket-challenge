export class InvalidDeadlineError extends Error {
  constructor(deadline: string) {
    super(`The deadline "${deadline}" is invalid.`)
    this.name = 'InvalidDeadlineError'
  }
}
