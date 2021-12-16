import { Request, Response } from 'express';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      return response.json({});
    } catch (err) {
      response.statusCode = err.statusCode;
      return response.json(err);
    }
  }
}
