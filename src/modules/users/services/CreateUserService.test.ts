import { AccountModel } from '../../../account';
import HttpResponse from '../../../shared/error/helpers/http-error';
import MissingParamsError from '../../../shared/error/errors/missing-param-error';

const fakeUser: AccountModel = {
  email: 'same_email@gmail.com',
  name: 'any_name2',
  password: 'any_password2',
};

class CreateUserRouter {
  route = (httpRequest: { body: AccountModel }) => {
    const { email, password, name } = httpRequest.body;
    if (email === fakeUser.email) {
      return HttpResponse.badRequest('Email já está em uso!!');
    }

    if (!email) {
      return HttpResponse.badRequest('Campo email está vazio!!!');
    }

    if (email.indexOf('@') === -1) {
      return HttpResponse.badRequest('Email está inválido!!!');
    }

    if (!password) {
      return HttpResponse.badRequest('Campo senha está vazio!!!');
    }

    if (password.length < 8) {
      return HttpResponse.badRequest(
        'Campo senha está menor que 8 caracteres!!!',
      );
    }

    if (!name) {
      return HttpResponse.badRequest('Campo nome está vazio!!!');
    }
    return {
      statusCode: HttpResponse.ok().statusCode,
      body: '',
    };
  };
}

describe('User Register Router', () => {
  test('Should return 400 and message if the email is already being used', () => {
    const sut = new CreateUserRouter();
    const httpRequest = {
      body: {
        email: 'same_email@gmail.com',
        name: 'any_name2',
        password: 'any_password2',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamsError('Email já está em uso!!'),
    );
  });

  test('Should return 400 and message if no email is provided', () => {
    const sut = new CreateUserRouter();
    const httpRequest = {
      body: {
        password: 'any_password',
        name: 'any_name',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamsError('Campo email está vazio!!!'),
    );
  });

  test('Should return 400 and message if email is invalid', () => {
    const sut = new CreateUserRouter();
    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password',
        name: 'any_name',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamsError('Email está inválido!!!'),
    );
  });

  test('Should return 400 and message if no password is provided', () => {
    const sut = new CreateUserRouter();
    const httpRequest = {
      body: {
        email: 'any_email@gmail.com',
        name: 'any_name',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);

    expect(httpResponse.body).toEqual(
      new MissingParamsError('Campo senha está vazio!!!'),
    );
  });

  test('Should return 400 and message if password less than 8 characters', () => {
    const sut = new CreateUserRouter();
    const httpRequest = {
      body: {
        email: 'any_email@gmail.com',
        name: 'any_name',
        password: '123456',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);

    expect(httpResponse.body).toEqual(
      new MissingParamsError('Campo senha está menor que 8 caracteres!!!'),
    );
  });

  test('Should return 400 and message if no name is provided', () => {
    const sut = new CreateUserRouter();
    const httpRequest = {
      body: {
        email: 'any_email@gmail.com',
        password: '123456789',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);

    expect(httpResponse.body).toEqual(
      new MissingParamsError('Campo nome está vazio!!!'),
    );
  });
});
