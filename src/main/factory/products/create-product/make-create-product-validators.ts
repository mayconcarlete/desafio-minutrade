import { MinValue , LengthSize , IsANumber , RequiredFields , ValidatorComposite } from '@validations/index'

export const makeCreateProductValidator = (): ValidatorComposite => {
  const validators = []

  const requiredFields = ['name', 'price']
  for (const field of requiredFields) {
    validators.push(new RequiredFields(field))
  }

  const fieldName = 'name'
  const min = 5
  const max = 20
  const lengthSize = new LengthSize(fieldName, min, max)
  validators.push(lengthSize)

  const notANumberField = 'price'
  const notANumber = new IsANumber(notANumberField)
  validators.push(notANumber)

  const minValueField = 'price'
  const minimunValue = 0
  const minValue = new MinValue(minValueField, minimunValue)
  validators.push(minValue)

  return new ValidatorComposite(validators)
}
