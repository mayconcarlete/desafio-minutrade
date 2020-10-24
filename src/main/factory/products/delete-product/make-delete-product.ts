import { DeleteProduct } from '@data/products/usecases/delete-product/delete-product'
import { FakeProductsDb } from '@infra/fake-db/products/products'
import { DeleteByNameController } from '@presentation/controllers/products/delete-by-name/delete-by-name'
import { makeDeleteValidator } from './make-delete-product-validator'

export const makeDeleteProduct = (): DeleteByNameController => {
  const validators = makeDeleteValidator()
  const deleteByNameAdapter = FakeProductsDb.instance
  const deleteByNameData = new DeleteProduct(deleteByNameAdapter)
  return new DeleteByNameController(validators, deleteByNameData)
}
