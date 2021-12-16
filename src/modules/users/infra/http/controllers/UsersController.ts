import { Request, Response } from 'express';
import CreateUserService from '../../../services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const createUserService = new CreateUserService();
      const user = await createUserService.execute({
        name,
        email,
        password,
      });
      return response.json(user);
    } catch (err) {
      response.statusCode = err.statusCode;
      return response.json(err);
    }
  }
}
