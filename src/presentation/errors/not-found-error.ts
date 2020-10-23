export class NotFoundError extends Error {
  constructor (paramName: string) {
    super(`${paramName} was not found`)
    this.name = 'NotFoundError'
  }
}
