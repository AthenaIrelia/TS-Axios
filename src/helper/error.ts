import { AxiosRequestConfig, AxiosResponse } from "../types";

export class AxiosError extends Error {
  private config: AxiosRequestConfig;
  private request?: any;
  private code?: string | null | number;
  private response?: AxiosResponse;

  constructor(
    message: string,
    config: AxiosRequestConfig,
    request?: any,
    code?: string | null | number,
    response?: AxiosResponse
  ) {
    super(message);

    this.config = config;
    this.request = request;
    this.code = code;
    this.response = response;

    Object.setPrototypeOf(this, AxiosError.prototype);
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code: string | null | number,
  request?: any,
  response?: AxiosResponse
) {
  const error = new AxiosError(message, config, code, request, response);
  return error;
}