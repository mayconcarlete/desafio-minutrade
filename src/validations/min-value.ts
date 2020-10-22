import { IValidator } from '@presentation/protocols'
import { MinValueError } from './errors/min-value-error'

export class MinValue implements IValidator {
  private readonly fieldName: string
  private readonly minValue: number

  constructor (fieldName: string, minValue: number) {
    this.fieldName = fieldName
    this.minValue = minValue
  }

  validate (input: any): Error | undefined {
    if (input[this.fieldName] === 0 && this.minValue === 0) {
      return new MinValueError(this.fieldName)
    }
    if (input[this.fieldName] < this.minValue) {
      return new MinValueError(this.fieldName)
    }
    return undefined
  }
}
