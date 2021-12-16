import MissingParamError from '../errors/missing-param-error';

export default class HttpResponse {
  static badRequest(paramName: string): any {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName),
    };
  }

  static ok() {
    return {
      statusCode: 200,
    };
  }

  static serverError(paramName: string) {
    return {
      statusCode: 500,
      body: new MissingParamError(paramName),
    };
  }
}
