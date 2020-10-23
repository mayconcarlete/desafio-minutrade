import { IDeleteProduct } from '@domain/products/usecases/delete-product'
import { THttpRequest, THttpResponse } from '@presentation/models'
import { IController, IValidator } from '@presentation/protocols'
import { badRequest, ok, serverError } from '@presentation/utils/http-responses'

export class DeleteByNameController implements IController {
  private readonly validators: IValidator
  private readonly deleteByNameData: IDeleteProduct

  constructor (validators: IValidator, deleteByNameData: IDeleteProduct) {
    this.validators = validators
    this.deleteByNameData = deleteByNameData
  }

  async handle (req: THttpRequest): Promise<THttpResponse> {
    try {
      const error = this.validators.validate(req.body)
      if (error) {
        return badRequest(error)
      }
      return ok('ok')
    } catch (e) {
      return serverError(e)
    }
  }
}
