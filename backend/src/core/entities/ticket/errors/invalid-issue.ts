export class InvalidIssueError extends Error {
  constructor(issue: string) {
    super(`The issue "${issue}" is invalid.`)
    this.name = 'InvalidIssueError'
  }
}
