import { CreateMultipleProducts } from '@data/products/usecases/multiple-create-products/create-multiple-products'
import { FakeProductsDb } from '@infra/fake-db/products/products'
import { CreateMultipleProductsController } from '@presentation/controllers/products/create-multiple-products/create-multiple-products'
import { makeCreateMultipleValidator } from './make-create-multiples-validator'

export const makeCreateMultipleProducts = (): CreateMultipleProductsController => {
  const validators = makeCreateMultipleValidator()
  const fakeDb = new FakeProductsDb()
  const createMultipleData = new CreateMultipleProducts(fakeDb)
  return new CreateMultipleProductsController(validators, createMultipleData)
}
