import 'reflect-metadata';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import IUser from '../infra/typeorm/entities/User';
import AppError from '../../../shared/error/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<IUser> {
    try {
      const usersRepository = await getRepository(IUser);

      const checkUserExists = await usersRepository.findOne({
        where: { email },
      });

      if (!email || email.length === 0) {
        throw new AppError('Campo email está vazio!!!', 400);
      }

      if (email.indexOf('@') === -1) {
        throw new AppError('Insira um email!!!', 400);
      }

      if (name.length === 0 || !name) {
        throw new AppError('Campo nome está inválido!!!', 400);
      }
      if (password.length === 0 || !password) {
        throw new AppError('Campo senha está vázio!!!', 400);
      }
      if (password.length < 8) {
        throw new AppError(
          'Campo senha deve ter no mínimo 8 caractéres!!!',
          400,
        );
      }
      if (checkUserExists) {
        throw new AppError('Email já está em uso!!!', 400);
      }
      const hashedPassword = await hash(password, 8);
      const user = await usersRepository.create({
        name,
        email,
        password: hashedPassword,
      });

      await usersRepository.save(user);
      return user;
    } catch (err) {
      return err;
    }
  }
}
export default CreateUserService;
