import { THttpRequest, THttpResponse } from '@presentation/models/'
import { IController, IValidator } from '@presentation/protocols/'
import { badRequest, created, serverError } from '@presentation/utils/http-responses'
import { ICreateProduct } from '@domain/products/usecases/create-product'
import { InvalidParamError } from '@presentation/errors/invalid-param-error'

export class CreateProductController implements IController {
  private readonly validators: IValidator
  private readonly createProduct: ICreateProduct
  constructor (validators: IValidator, createProduct: ICreateProduct) {
    this.validators = validators
    this.createProduct = createProduct
  }

  async handle (req: THttpRequest): Promise<THttpResponse> {
    try {
      const error = this.validators.validate(req.body)
      if (error) {
        return badRequest(error)
      }
      const newProduct = await this.createProduct.create(req.body)
      if (newProduct) {
        return created(newProduct)
      }
      return badRequest(new InvalidParamError('Product already exists'))
    } catch (e) {
      return serverError(e)
    }
  }
}
