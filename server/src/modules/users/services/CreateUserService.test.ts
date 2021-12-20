import { createConnections, getConnection } from 'typeorm';
import CreateUserService from './CreateUserService';

beforeAll(async () => {
  await createConnections();
});

afterAll(async () => {
  const defaultConnection = getConnection('default');
  await defaultConnection.close();
});

const makeSut = () => {
  return new CreateUserService();
};

describe('User Register Service', () => {
  test('Should return 400 and message if no email is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      email: '',
      password: 'any_password',
      name: 'any_name',
    };
    const httpResponse = await sut.execute(httpRequest);

    expect(httpResponse).toEqual({
      message: 'Campo email está vazio!!!',
      statusCode: 400,
    });
  });

  test('Should return 400 and message if email is invalid', async () => {
    const sut = makeSut();
    const httpRequest = {
      email: 'any_email',
      password: 'any_password',
      name: 'any_name',
    };
    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse).toEqual({
      message: 'Insira um email!!!',
      statusCode: 400,
    });
  });

  test('Should return 400 and message if no name is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      email: 'any_email@gmail.com',
      password: '123456789',
      name: '',
    };

    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse).toEqual({
      message: 'Campo nome está inválido!!!',
      statusCode: 400,
    });
  });
  test('Should return 400 and message if no password is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      email: 'any_email@gmail.com',
      password: '',
      name: 'any_name',
    };
    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse).toEqual({
      message: 'Campo senha está vázio!!!',
      statusCode: 400,
    });
  });

  test('Should return 400 and message if password less than 8 characters', async () => {
    const sut = makeSut();
    const httpRequest = {
      email: 'any_email@gmail.com',
      name: 'any_name',
      password: '123456',
    };

    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse).toEqual({
      message: 'Campo senha deve ter no mínimo 8 caractéres!!!',
      statusCode: 400,
    });
  });

  test('Should return 400 and message if the email is already being used', async () => {
    const sut = makeSut();
    const httpRequest = {
      email: 'same_email@gmail.com',
      name: 'any_name2',
      password: 'any_password2',
    };
    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse).toEqual({
      message: 'Email já está em uso!!!',
      statusCode: 400,
    });
  });
});
