import { IGetAllProducts } from '@domain/products/usecases/get-all-products'
import { THttpRequest, THttpResponse } from '@presentation/models'
import { IController } from '@presentation/protocols'
import { ok, serverError } from '@presentation/utils/http-responses'

export class GetAllProductsController implements IController {
  private readonly getAllProducts: IGetAllProducts
  constructor (getAllProducts: IGetAllProducts) {
    this.getAllProducts = getAllProducts
  }

  async handle (req: THttpRequest): Promise<THttpResponse> {
    try {
      const products = await this.getAllProducts.get()
      return ok(products)
    } catch (e) {
      return serverError(e)
    }
  }
}
