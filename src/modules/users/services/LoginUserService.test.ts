import { AccountModel } from '../../../account';
import HttpResponse from '../../../shared/error/helpers/http-error';
import MissingParamsError from '../../../shared/error/errors/missing-param-error';

const fakeAccounts: AccountModel[] = [
  {
    email: 'any_email1@gmail.com',
    name: 'any_name1',
    password: 'any_password1',
  },
  {
    email: 'any_email2@gmail.com',
    name: 'any_name2',
    password: 'any_password2',
  },
];

class LoginUserRouter {
  findByEmail = (httpRequest: { body: AccountModel }): boolean => {
    const { email } = httpRequest.body;
    let isEmailValid = false;
    fakeAccounts.forEach(account => {
      if (account.email === email) isEmailValid = true;
    });
    return isEmailValid;
  };

  route = (httpRequest: { body: AccountModel }) => {
    const { email, password } = httpRequest.body;
    const findByEmail: boolean = this.findByEmail(httpRequest);
    if (!email) {
      return HttpResponse.badRequest('Campo email está vazio!!!');
    }
    if (email.indexOf('@') === -1) {
      return HttpResponse.badRequest('Email está inválido!!!');
    }
    if (!findByEmail) {
      return HttpResponse.badRequest('Email/Password inválido!!!');
    }
    if (!password) {
      return HttpResponse.badRequest('Campo senha está vazio!!!');
    }

    if (password.length < 8) {
      return HttpResponse.badRequest(
        'Campo senha está menor que 8 caracteres!!!',
      );
    }
    return {
      statusCode: HttpResponse.ok().statusCode,
      body: '',
    };
  };
}

describe('User authenticate', () => {
  test('Should return 400 and message if no email is provided', () => {
    const sut = new LoginUserRouter();
    const httpRequest = {
      body: {
        password: 'any_password2',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamsError('Campo email está vazio!!!'),
    );
  });

  test('Should return 400 and message if email is invalid', () => {
    const sut = new LoginUserRouter();
    const httpRequest = {
      body: {
        email: 'any_email.com',
        password: 'any_password2',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamsError('Email está inválido!!!'),
    );
  });

  test('Should return 400 and message if the email is not exist registed', () => {
    const sut = new LoginUserRouter();
    const httpRequest = {
      body: {
        email: 'any_email@gmail.com',
        password: 'any_password2',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamsError('Email/Password inválido!!!'),
    );
  });

  test('Should return 400 and message if no password is provided', () => {
    const sut = new LoginUserRouter();
    const httpRequest = {
      body: {
        email: 'any_email2@gmail.com',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamsError('Campo senha está vazio!!!'),
    );
  });

  test('Should return 400 and message if password less than 8 characters', () => {
    const sut = new LoginUserRouter();
    const httpRequest = {
      body: {
        email: 'any_email2@gmail.com',
        password: 'sadasd',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamsError('Campo senha está menor que 8 caracteres!!!'),
    );
  });
});
