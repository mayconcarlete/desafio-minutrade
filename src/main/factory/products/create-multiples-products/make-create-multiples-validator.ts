import { IValidator } from '@presentation/protocols'
import { RequiredFields , ValidatorComposite } from '@validations/index'

export const makeCreateMultipleValidator = (): ValidatorComposite => {
  const validators: IValidator[] = []
  const requiredField = 'products'
  validators.push(new RequiredFields(requiredField))
  return new ValidatorComposite(validators)
}
