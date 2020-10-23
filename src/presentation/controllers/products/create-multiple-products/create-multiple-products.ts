import { ICreateMultipleProducts } from '@domain/products/usecases/create-multiple-products'
import { THttpRequest, THttpResponse } from '@presentation/models'
import { IController, IValidator } from '@presentation/protocols'
import { badRequest, created, serverError } from '@presentation/utils/http-responses'

export class CreateMultipleProductsController implements IController {
  private readonly validators: IValidator
  private readonly createMultipleProducts: ICreateMultipleProducts
  constructor (validators: IValidator, createMultipleProducts: ICreateMultipleProducts) {
    this.validators = validators
    this.createMultipleProducts = createMultipleProducts
  }

  async handle (req: THttpRequest): Promise<THttpResponse> {
    try {
      const error = this.validators.validate(req.body)
      if (error) {
        return badRequest(error)
      }
      const newProducts = await this.createMultipleProducts.createMultiples(req.body)
      return created(newProducts)
    } catch (e) {
      return serverError(e)
    }
  }
}
