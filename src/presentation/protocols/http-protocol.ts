import { THttpRequest, THttpResponse } from '@presentation/models'

export interface IController{
  handle: (req: THttpRequest) => Promise<THttpResponse>
}
