import { IValidator } from '@presentation/protocols/'
import { LengthError } from './errors/length-error'

export class LengthSize implements IValidator {
  private readonly fieldName: string
  private readonly min: number
  private readonly max: number

  constructor (fieldName: string, min: number, max: number) {
    this.fieldName = fieldName
    this.min = min
    this.max = max
  }

  validate (body: any): Error | undefined {
    if (body[this.fieldName].trim().length < this.min || body[this.fieldName].trim().length > this.max) {
      return new LengthError(this.fieldName)
    }
    return undefined
  }
}
