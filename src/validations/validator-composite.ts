import { IValidator } from '@presentation/protocols/validation-protocol'

export class ValidatorComposite implements IValidator {
  private readonly validators
  constructor (validators: IValidator[]) {
    this.validators = validators
  }

  validate (input: any): Error | undefined {
    for (const validator of this.validators) {
      const error = validator.validate(input)
      if (error) {
        return error
      }
    }
  }
}
