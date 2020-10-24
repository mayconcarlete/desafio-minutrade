import { GetAllProducts } from '@data/products/usecases/get-all-products/get-all-products'
import { FakeProductsDb } from '@infra/fake-db/products/products'
import { GetAllProductsController } from '@presentation/controllers/products/get-all-products/get-all-products'

export const makeGetAllProducts = (): GetAllProductsController => {
  const fakeDbAdapter = FakeProductsDb.instance
  const getAllData = new GetAllProducts(fakeDbAdapter)
  return new GetAllProductsController(getAllData)
}
