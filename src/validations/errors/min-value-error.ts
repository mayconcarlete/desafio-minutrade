export class MinValueError extends Error {
  constructor (fieldName: string) {
    super(`${fieldName} field is shorter then minimun`)
    this.name = 'MinValueError'
  }
}
