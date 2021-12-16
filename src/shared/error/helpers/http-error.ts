import MissingParamError from '../errors/missing-param-error';

interface IResponse {
  statusCode: number;
  body: MissingParamError;
}
export default class HttpResponse {
  static badRequest(paramName: string): IResponse {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName),
    };
  }

  static ok(): IResponse {
    return {
      statusCode: 200,
      body: new MissingParamError(''),
    };
  }

  static serverError(paramName: string): IResponse {
    return {
      statusCode: 500,
      body: new MissingParamError(paramName),
    };
  }
}
