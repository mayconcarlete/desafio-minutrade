import { THttpRequest } from '@presentation/models'
import { IController } from '@presentation/protocols'
import { Request, Response } from 'express'

export const adapterRoute = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const request: THttpRequest = {
      body: req.body,
      params: req.params
    }
    const result = await controller.handle(request)
    return res.status(result.statusCode).json(result.body)
  }
}
