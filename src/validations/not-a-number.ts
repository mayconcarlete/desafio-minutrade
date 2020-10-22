import { IValidator } from '@presentation/protocols'
import { NotANumberError } from './errors/not-a-number-error'

export class NotANumber implements IValidator {
  private readonly fieldName: string

  constructor (fieldName: string) {
    this.fieldName = fieldName
  }

  validate (body: any): Error | undefined {
    if (typeof (body[this.fieldName]) !== 'number') {
      return new NotANumberError(this.fieldName)
    }
    return undefined
  }
}
