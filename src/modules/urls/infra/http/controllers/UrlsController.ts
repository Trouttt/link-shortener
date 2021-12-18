import { Request, Response } from 'express';
import Http from '../../../../../shared/error/Http';

export default class UrlsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { url, user_id } = request.body;

      const http = new Http();


      return response.json({});
    } catch (err) {
      response.statusCode = err.statusCode;
      return response.json(err);
    }
  }
}
