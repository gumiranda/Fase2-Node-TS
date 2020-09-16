import { Controller } from '@/bin/protocols/controller';
import { HttpRequest } from '@/bin/protocols/http';
import { Request, Response } from 'express';

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const body = req.body;
    const httpRequest: HttpRequest = {
      body,
      io: req.io,
      params: req.params,
      userId: req.userId,
      connectedUsers: req.connectedUsers,
    };
    const httpResponse = await controller.handle(httpRequest);
    if (httpResponse.statusCode >= 200 || httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      if (httpResponse?.body?.message) {
        res.status(httpResponse.statusCode).json({
          error: httpResponse.body.message,
        });
      } else {
        res.status(httpResponse.statusCode).json({
          error: httpResponse.body,
        });
      }
    }
  };
};