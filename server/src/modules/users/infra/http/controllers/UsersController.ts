import { Request, Response } from 'express';
import Http from '../../../../../shared/error/Http';
import CreateUserService from '../../../services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const http = new Http();
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    response.statusCode = http.response(user);

    return response.json(user);
  }
}
