import { THttpRequest, THttpResponse } from '@presentation/models/'
import { IController, IValidator } from '@presentation/protocols/'
import { badRequest, created, serverError } from '@presentation/utils/http-responses'

export class CreateProductController implements IController {
  private readonly validators: IValidator
  constructor (validators: IValidator) {
    this.validators = validators
  }

  async handle (req: THttpRequest): Promise<THttpResponse> {
    try {
      const error = this.validators.validate(req.body)
      if (error) {
        return badRequest(error)
      }
      return created('ok')
    } catch (e) {
      return serverError(e)
    }
  }
}
