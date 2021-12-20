import { createConnections, getConnection } from 'typeorm';
import DeleteUrlService from './DeleteShortUrlService';

const makeSut = () => {
  return new DeleteUrlService();
};

beforeAll(async () => {
  await createConnections();
});

afterAll(async () => {
  const defaultConnection = getConnection('default');
  await defaultConnection.close();
});

describe('URL register service', () => {
  test('Should return 400 and message if no id is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      id: '',
    };
    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse).toEqual({
      message: 'Id inválido!!!',
      statusCode: 400,
    });
  });
  test('Should return 400 and message if no url is founded', async () => {
    const sut = makeSut();
    const httpRequest = {
      id: '378866df-27e0-4b13-abd2-fa0a3967aa6e',
    };
    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse).toEqual({
      message: 'A url não existe!!!',
      statusCode: 400,
    });
  });
});
