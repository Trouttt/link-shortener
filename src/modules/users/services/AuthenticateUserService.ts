import 'reflect-metadata';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import auth from '../../../config/auth';

import IUser from '../infra/typeorm/entities/User';
import AppError from '../../../shared/error/AppError';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: IUser;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    try {
      const usersRepository = await getRepository(IUser);

      const user = await usersRepository.findOne({
        where: { email },
      });

      if (!email || email.length === 0) {
        throw new AppError('Campo email está vazio!!!', 400);
      }

      if (email.indexOf('@') === -1) {
        throw new AppError('Insira um email!!!', 400);
      }
      if (!user) {
        throw new AppError('Email/Password inválido!!!', 400);
      }
      if (password?.length === 0 || !password) {
        throw new AppError('Campo senha está vázio!!!', 400);
      }

      if (password.length < 8) {
        throw new AppError(
          'Campo senha deve ter no mínimo 8 caractéres!!!',
          400,
        );
      }
      const passwordMatched = await compare(password, user.password);
      if (user && !passwordMatched) {
        throw new AppError('Email/Password inválido!!!!', 400);
      }
      const { expiresIn } = auth.jwt;
      const token = sign({}, auth.jwt.secret, {
        subject: user.id,
        expiresIn,
      });

      return {
        token,
        user,
      };
    } catch (err) {
      return err;
    }
  }
}

export default AuthenticateUserService;
