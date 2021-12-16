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
  route = (httpRequest: { body: AccountModel }) => {
    const { email, password } = httpRequest.body;

    if (!email) {
      return HttpResponse.badRequest('Campo email está vazio!!!');
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
});
