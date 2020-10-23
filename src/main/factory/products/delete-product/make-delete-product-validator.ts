import { LengthSize , RequiredFields , ValidatorComposite } from '@validations/index'

export const makeDeleteValidator = (): ValidatorComposite => {
  const validators = []
  const fieldName = 'name'

  const requiredField = new RequiredFields(fieldName)
  validators.push(requiredField)

  const min = 5
  const max = 20
  const lengthSize = new LengthSize(fieldName, min, max)
  validators.push(lengthSize)
  return new ValidatorComposite(validators)
}
