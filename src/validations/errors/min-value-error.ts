export class MinValueError extends Error {
  constructor (fieldName: string) {
    super(`${fieldName} field is shorter than minimum`)
    this.name = 'MinValueError'
  }
}
