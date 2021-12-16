export default class MissingParamError {
  error: string;

  constructor(paramName: string) {
    this.error = paramName;
  }
}
