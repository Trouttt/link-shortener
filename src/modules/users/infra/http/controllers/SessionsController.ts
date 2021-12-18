import { Request, Response } from 'express';
import Http from '../../../../../shared/error/Http';
import LoginUserService from '../../../services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const http = new Http();
      const authenticateUser = new LoginUserService();
      const { user, token } = await authenticateUser.execute({
        email,
        password,
      });

      response.statusCode = http.response(user);
      return response.json({ user, token });
    } catch (err) {
      response.statusCode = err.statusCode;
      return response.json(err);
    }
  }
}
