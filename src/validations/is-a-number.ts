import { IValidator } from '@presentation/protocols'
import { IsANumberError } from './errors/is-a-number-error'

export class IsANumber implements IValidator {
  private readonly fieldName: string

  constructor (fieldName: string) {
    this.fieldName = fieldName
  }

  validate (body: any): Error | undefined {
    if (typeof (body[this.fieldName]) !== 'number') {
      return new IsANumberError(this.fieldName)
    }
    return undefined
  }
}
