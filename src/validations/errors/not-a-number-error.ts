export class NotANumberError extends Error {
  constructor (fieldName: string) {
    super(`${fieldName} field is not a number`)
    this.name = 'NotANumber'
  }
}
