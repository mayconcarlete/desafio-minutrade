import { IGetAllNames } from '@domain/products/usecases/get-all-names'
import { THttpRequest, THttpResponse } from '@presentation/models'
import { IController } from '@presentation/protocols'
import { serverError , ok } from '@presentation/utils/http-responses'

export class GetAllNamesController implements IController {
  private readonly getArrayNames: IGetAllNames
  constructor (getArrayNames: IGetAllNames) {
    this.getArrayNames = getArrayNames
  }

  async handle (req: THttpRequest): Promise<THttpResponse> {
    try {
      const namesArray = await this.getArrayNames.getAllNames()
      return ok(namesArray)
    } catch (e) {
      return serverError(e)
    }
  }
}
