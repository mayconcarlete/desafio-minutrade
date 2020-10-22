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
    body[this.fieldName] = body[this.fieldName].trim()
    if (body[this.fieldName].length < this.min || body[this.fieldName].length > this.max) {
      return new LengthError(this.fieldName)
    }
    return undefined
  }
}
