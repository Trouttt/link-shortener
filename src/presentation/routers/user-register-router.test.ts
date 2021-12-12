/* eslint-disable prettier/prettier */
import AccountModel from '../../domain/models/account';

const fakeUser: AccountModel = {
  email: 'same_email@gmail.com',
  name: 'any_name2',
  password: 'any_password2'
}
class UserRegisterRouter {
  route = (httpRequest: { body: AccountModel }) => {
    if (httpRequest.body.email === fakeUser.email) {
      return {
        statusCode: 400,
        message: 'Email já está em uso!!',
      }
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        message: 'Campo do email está vazio!!!',
      };
    } 
  
    if (!httpRequest.body.password) {
      return {
        statusCode: 400,
        message: 'Campo da senha está vazia!!!',
      };
    }
    return {
      statusCode: 200,
    };
  };
}

describe('User Register Router', () => {
  test('Should return 400 and message if the email is already being used', () => {
    const sut = new UserRegisterRouter();

    const httpRequest = {
      body: {
        email: 'same_email@gmail.com',
        name: 'any_name2',
        password: 'any_password2'
      }
    }
    const httpResponse = sut.route(httpRequest);
    expect(
      httpResponse.message && httpResponse.statusCode,
    ).toBe(
     'Email já está em uso!!!' &&
       400,
    );
  })

  test('Should return 400 and message if no email is provided', () => {
    const sut = new UserRegisterRouter();
    const httpRequest = {
      body: {
        password: 'any_password',
        name: 'any_name',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(
      httpResponse.message && httpResponse.statusCode,
    ).toBe(
     'Campo do email está vazio!!!' &&
       400,
    );
  });

  test('Should return 400 and message if no password is provided', () => {
    const sut = new UserRegisterRouter();
    const httpRequest = {
      body: {
        email: 'any_email@gmail.com',
        name: 'any_name',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.message && httpResponse.statusCode).toBe('Campo da senha está vazia!!!' && 400);
  });
});
