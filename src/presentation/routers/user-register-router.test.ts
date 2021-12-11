import AccountModel from '../../domain/models/account';

class UserRegisterRouter {
  route = (httpRequest: { body: AccountModel }) => {
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
      };
    }
    return {
      statusCode: 200,
    };
  };
}

describe('User Register Router', () => {
  test('Should return 400 if no email is provided', () => {
    const sut = new UserRegisterRouter();
    const httpRequest = {
      body: {
        password: 'aspokdsp',
        name: 'teste',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});
