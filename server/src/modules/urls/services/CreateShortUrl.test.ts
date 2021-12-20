import { createConnections, getConnection } from 'typeorm';
import CreateUrlService from './CreateShortUrlService';

const makeSut = () => {
  return new CreateUrlService();
};

beforeAll(async () => {
  await createConnections();
});

afterAll(async () => {
  const defaultConnection = getConnection('default');
  await defaultConnection.close();
});

describe('URL register service', () => {
  test('Should return 400 and message if no url is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      url: '',
      user_id: '',
      shortUrl: '',
      visited: 1,
    };
    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse).toEqual({
      message: 'Campo URL está vazio!!!',
      statusCode: 400,
    });
  });
});
