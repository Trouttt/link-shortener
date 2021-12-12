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
        message: 'Campo email está vazio!!!',
      };
    } 

    if (httpRequest.body.email.indexOf('@') === -1) {
      return {
        statusCode: 400,
        message: 'Email está inválido!!!'
      }
    }

  
    if (!httpRequest.body.password) {
      return {
        statusCode: 400,
        message: 'Campo senha está vazio!!!',
      };
    }

    if (httpRequest.body.password.length < 8){
      return {
        statusCode: 400,
        message: 'Campo senha está menor que 8 caracteres!!!'
      }
    }

    if (!httpRequest.body.name){
      return {
        statusCode: 400,
        message: 'Campo nome está vazio!!!'
      }
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
     httpResponse.statusCode,
    ).toBe(
       400,
    );
    expect(httpResponse.message).toBe('Email já está em uso!!')
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
      httpResponse.statusCode,
    ).toBe(
       400,
    );
    expect(httpResponse.message).toBe('Campo email está vazio!!!');
  });

  test('Should return 400 and message if email is invalid', () => {
    const sut = new UserRegisterRouter();
    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password',
        name: 'any_name',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.message).toBe('Email está inválido!!!')
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
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.message).toBe('Campo senha está vazio!!!');
  });

  
  test('Should return 400 and message if password less than 8 characters', () => {
    const sut = new UserRegisterRouter();
    const httpRequest = {
      body: {
        email: 'any_email@gmail.com',
        name: 'any_name', 
        password: '123456'
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.message).toBe('Campo senha está menor que 8 caracteres!!!');
  });
  
  test('Should return 400 and message if no name is provided', () => {
    const sut = new UserRegisterRouter();
    const httpRequest = {
      body: {
        email: 'any_email@gmail.com',
        password: '123456789'
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.message).toBe('Campo nome está vazio!!!');
  });

  
});
