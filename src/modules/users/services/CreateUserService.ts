import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { response, Response } from 'express';
import IUser from '../infra/typeorm/entities/User';
import HttpResponse from '../../../shared/error/helpers/http-error';
import AppError from '../../../shared/error/errors/missing-param-error';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<IUser> {
    const usersRepository = getRepository(IUser);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });
    if (checkUserExists) {
      throw HttpResponse.badRequest('Email já está em uso!!');
    }

    if (!email) {
      throw HttpResponse.badRequest('Campo email está vazio!!');
    }

    if (email.indexOf('@') === -1) {
      throw HttpResponse.badRequest('Email está inválido!!!');
    }
    const hashedPassword = await hash(password, 8);
    const user = await usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}
export default CreateUserService;
