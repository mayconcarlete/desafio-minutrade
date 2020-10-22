import { IValidator } from '@presentation/protocols/validation-protocol'
import { MissingParamError } from './errors/missing-param-error'

export class RequiredFields implements IValidator {
  private readonly fieldName
  constructor (fieldName: string) {
    this.fieldName = fieldName
  }

  validate (input: any): Error | undefined {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
    return undefined
  }
}
