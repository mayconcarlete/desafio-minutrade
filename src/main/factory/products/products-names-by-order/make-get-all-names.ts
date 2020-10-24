import { GetAllNames } from '@data/products/usecases/get-all-names/get-all-names'
import { FakeProductsDb } from '@infra/fake-db/products/products'
import { GetAllNamesController } from '@presentation/controllers/products/products-names-by-order/get-all-names-by-order'

export const makeGetAllNames = (): GetAllNamesController => {
  const loadNamesDbAdapter = FakeProductsDb.instance
  const getArrayNames = new GetAllNames(loadNamesDbAdapter)
  return new GetAllNamesController(getArrayNames)
}
