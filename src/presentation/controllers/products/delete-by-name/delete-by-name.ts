import { IDeleteProduct } from '@domain/products/usecases/delete-product'
import { NotFoundError } from '@presentation/errors/not-found-error'
import { THttpRequest, THttpResponse } from '@presentation/models'
import { IController, IValidator } from '@presentation/protocols'
import { badRequest, notFound, ok, serverError } from '@presentation/utils/http-responses'

export class DeleteByNameController implements IController {
  private readonly validators: IValidator
  private readonly deleteByNameData: IDeleteProduct

  constructor (validators: IValidator, deleteByNameData: IDeleteProduct) {
    this.validators = validators
    this.deleteByNameData = deleteByNameData
  }

  async handle (req: THttpRequest): Promise<THttpResponse> {
    const body = Object.assign({}, req.body, req.params)
    try {
      const error = this.validators.validate(body)
      if (error) {
        return badRequest(error)
      }
      const product = await this.deleteByNameData.deleteProduct(body.name)
      if (product) {
        return ok(product)
      }
      return notFound(new NotFoundError('Product'))
    } catch (e) {
      return serverError(e)
    }
  }
}
