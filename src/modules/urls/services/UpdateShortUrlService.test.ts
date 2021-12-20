import { createConnections, getConnection } from 'typeorm';
import AppError from '../../../shared/error/AppError';
import UpdateShortUrlService from './UpdateShortUrlService';

const makeSut = () => {
  return new UpdateShortUrlService();
};

beforeAll(async () => {
  await createConnections();
});

afterAll(async () => {
  const defaultConnection = getConnection('default');
  await defaultConnection.close();
});

describe('URL register service', () => {
  test('Should return 400 and message if id is not valid', async () => {
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

  test('Should return 400 and message if there is no url with this id', async () => {
    const sut = makeSut();
    const httpRequest = {
      id: 'e0898207-e196-4f43-9e5b-12205b9b0080',
    };
    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse).toEqual({
      message: 'A url não existe!!!',
      statusCode: 400,
    });
  });
});
