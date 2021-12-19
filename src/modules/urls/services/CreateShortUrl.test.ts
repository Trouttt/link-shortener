import { createConnections, getConnection } from 'typeorm';
import AppError from '../../../shared/error/AppError';

interface UrlModel {
  url: string;
  user_id: string;
  short_url?: string;
  visited: number;
}

class CreateUrlService {
  execute = (httpRequest: { body: UrlModel }) => {
    const { url } = httpRequest.body;
    if (url.length === 0 || !url) {
      return new AppError('Campo URL está vazio!!!', 400);
    }
    return null;
  };
}

const makeSut = () => {
  return new CreateUrlService();
};

describe('URL register service', () => {
  test('Should return 400 and message if no url is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        url: '',
        user_id: '',
        short_url: '',
        visited: 1,
      },
    };
    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse).toEqual({
      message: 'Campo URL está vazio!!!',
      statusCode: 400,
    });
  });
});
