import { IUpdateProduct } from '@domain/products/usecases/update-product'
import { THttpRequest, THttpResponse } from '@presentation/models'
import { IController, IValidator } from '@presentation/protocols'
import { badRequest, ok, serverError } from '@presentation/utils/http-responses'

export class UpdateProductController implements IController {
  private readonly validators: IValidator
  private readonly updateProductData: IUpdateProduct
  constructor (validators: IValidator,updateProductData: IUpdateProduct) {
    this.validators = validators
    this.updateProductData = updateProductData
  }

  async handle (req: THttpRequest): Promise<THttpResponse> {
    try {
      const body = Object.assign({}, req.body, req.params)
      const error = this.validators.validate(body)
      if (error) {
        return badRequest(error)
      }
      const updatedProduct = await this.updateProductData.update(body)
      if (updatedProduct) {
        return ok(updatedProduct)
      }
      return badRequest(new Error('Its not possible update product'))
    } catch (e) {
      return serverError(e)
    }
  }
}
