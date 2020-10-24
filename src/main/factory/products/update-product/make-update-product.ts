import { UpdateProduct } from '@data/products/usecases/update-product/update-product'
import { FakeProductsDb } from '@infra/fake-db/products/products'
import { UpdateProductController } from '@presentation/controllers/products/update-product/update-product'
import { makeCreateProductValidator } from '../create-product/make-create-product-validators'

export const makeUpdateProduct = (): UpdateProductController => {
  const validators = makeCreateProductValidator()
  const fakeDbAdapter = FakeProductsDb.instance
  const updateProductData = new UpdateProduct(fakeDbAdapter)
  return new UpdateProductController(validators, updateProductData)
}
