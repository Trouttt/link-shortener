import { Request, Response } from 'express';
import Http from '../../../../../shared/error/Http';
import CreateUrlService from '../../../services/CreateShortUrlService';
import UpdateUrlService from '../../../services/UpdateShortUrlService';
import GetShortUrlMoreVisitedService from '../../../services/GetShortUrlMoreVIsitedService';
import GetUserShortUrlService from '../../../services/GetUserUrlsServce';

export default class UrlsController {
  public async getUserUrls(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { user_id } = request.body;
      const http = new Http();
      const getUrlService = new GetUserShortUrlService();
      const link = await getUrlService.execute({ user_id });

      return response.json(link);
    } catch (err) {
      response.statusCode = err.statusCode;
      return response.json(err);
    }
  }

  public async getMoreVisited(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const http = new Http();
      const getUrlService = new GetShortUrlMoreVisitedService();
      const link = await getUrlService.execute();

      return response.json(link);
    } catch (err) {
      response.statusCode = err.statusCode;
      return response.json(err);
    }
  }

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

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.body;

      const http = new Http();
      const updateUrlService = new UpdateUrlService();
      const link = await updateUrlService.execute({
        id,
      });

      response.statusCode = http.response(link);

      return response.json(link);
    } catch (err) {
      response.statusCode = err.statusCode;
      return response.json(err);
    }
  }
}
