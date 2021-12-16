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

    return {
      statusCode: HttpResponse.ok().statusCode,
      body: '',
    };
  };
}

describe('User authenticate', () => {
});
