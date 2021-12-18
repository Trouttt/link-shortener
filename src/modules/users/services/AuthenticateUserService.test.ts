import { createConnections, getConnection } from 'typeorm';
import AuthenticateUserService from './AuthenticateUserService';

beforeAll(async () => {
  await createConnections();
});

afterAll(async () => {
  const defaultConnection = getConnection('default');
  await defaultConnection.close();
});

interface AppError {
  message: string;
  statusCode: number;
}

const makeSut = () => {
  return new AuthenticateUserService();
};
describe('User Login Service', () => {
  test('Should return 400 and message if no email is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      email: '',
      password: 'any_password',
    };
    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse).toEqual({
      user: {
        message: 'Campo email está vazio!!!',
        statusCode: 400,
      },
    });
  });

  test('Should return 400 and message if email is invalid', async () => {
    const sut = makeSut();
    const httpRequest = {
      email: 'any_email',
      password: 'any_password',
    };
    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse).toEqual({
      user: {
        message: 'Insira um email!!!',
        statusCode: 400,
      },
    });
  });
  test('Should return 400 and message if no password is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      email: 'any_email@gmail.com',
      password: '',
    };
    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse).toEqual({
      user: {
        message: 'Campo senha está vázio!!!',
        statusCode: 400,
      },
    });
  });

  test('Should return 400 and message if password less than 8 characters', async () => {
    const sut = makeSut();
    const httpRequest = {
      email: 'any_email@gmail.com',
      password: '123456',
    };

    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse).toEqual({
      user: {
        message: 'Campo senha deve ter no mínimo 8 caractéres!!!',
        statusCode: 400,
      },
    });
  });

  test('Should return 400 and message if email is not registered', async () => {
    const sut = makeSut();
    const httpRequest = {
      email: 'email_not_registered@gmail.com',
      password: 'any_password2',
    };
    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse).toEqual({
      user: {
        message: 'Email/Password inválido!!!',
        statusCode: 400,
      },
    });
  });

  test('Should return 400 and message if password is not matched', async () => {
    const sut = makeSut();
    const httpRequest = {
      email: 'email_registed@gmail.com',
      password: 'any_password222',
    };
    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse).toEqual({
      user: {
        message: 'Email/Password inválido!!!!',
        statusCode: 400,
      },
    });
  });
});
