import { Request, Response } from 'express';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      return response.json({});
    } catch (err) {
      response.statusCode = err.statusCode;
      return response.json(err);
    }
  }
}
