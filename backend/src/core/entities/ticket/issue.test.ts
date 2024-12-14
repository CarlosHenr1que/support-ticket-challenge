import { Issue } from './issue'
import { InvalidIssueError } from './errors/invalid-issue'

describe('Issue domain entity', () => {
  it('should create an Issue when the issue string is valid', () => {
    const issue = 'Valid Issue'

    const result = Issue.create(issue)

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeInstanceOf(Issue)
    expect((result.value as Issue).value).toBe(issue)
  })

  it('should return InvalidIssueError when the issue string is invalid', () => {
    const issue = ' '

    const result = Issue.create(issue)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidIssueError)
    expect((result.value as Error).message).toBe(`The issue "${issue}" is invalid.`)
  })
})
