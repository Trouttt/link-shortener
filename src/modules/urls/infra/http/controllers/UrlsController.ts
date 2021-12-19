import { Request, Response } from 'express';
import Http from '../../../../../shared/error/Http';
import CreateUrlService from '../../../services/CreateShortUrlService';

export default class UrlsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { url, shortUrl, user_id, visited } = request.body;

      const http = new Http();
      const createUrlService = new CreateUrlService();
      const link = await createUrlService.execute({
        url,
        shortUrl,
        user_id,
        visited,
      });

      response.statusCode = http.response(link);

      return response.json(link);
    } catch (err) {
      response.statusCode = err.statusCode;
      return response.json(err);
    }
  }
}
