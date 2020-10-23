import { InvalidParamError } from '@presentation/errors/invalid-param-error'
import { IValidator } from '@presentation/protocols'

export class ArraySize implements IValidator {
  private readonly min: number
  private readonly max: number
  constructor (min: number, max: number) {
    this.min = min
    this.max = max
  }

  validate (input: any[]): Error | undefined {
    if (input.length < this.min || input.length > this.max) {
      return new InvalidParamError('Invalid array size')
    }
  }
}
