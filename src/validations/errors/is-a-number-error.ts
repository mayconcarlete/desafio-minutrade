export class IsANumberError extends Error {
  constructor (fieldName: string) {
    super(`${fieldName} field is not a number`)
    this.name = 'IsANumberError'
  }
}
