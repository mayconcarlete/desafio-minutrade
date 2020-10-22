import { LengthSize } from 'src/validations/length-size'
import { MinValue } from 'src/validations/min-value'
import { IsANumber } from 'src/validations/is-a-number'
import { RequiredFields } from 'src/validations/required-fields'
import { ValidatorComposite } from 'src/validations/validator-composite'

export const makeCreateProductValidator = (): ValidatorComposite => {
  const validators = []

  const requiredFields = ['name', 'price']
  for (const field of requiredFields) {
    validators.push(new RequiredFields(field))
  }
  const notANumberField = 'price'
  const notANumber = new IsANumber(notANumberField)
  validators.push(notANumber)

  const minValueField = 'price'
  const minimunValue = 0
  const minValue = new MinValue(minValueField, minimunValue)
  validators.push(minValue)

  const fieldName = 'name'
  const min = 5
  const max = 20
  const lengthSize = new LengthSize(fieldName, min, max)
  validators.push(lengthSize)

  return new ValidatorComposite(validators)
}
