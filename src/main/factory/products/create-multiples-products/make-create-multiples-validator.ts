import { IValidator } from '@presentation/protocols'
import { ArraySize } from '@validations/array-size'
import { ValidatorComposite } from '@validations/index'

export const makeCreateMultipleValidator = (): ValidatorComposite => {
  const validators: IValidator[] = []
  const min = 1
  const max = 1000
  const arraySize = new ArraySize(min, max)
  validators.push(arraySize)
  return new ValidatorComposite(validators)
}
