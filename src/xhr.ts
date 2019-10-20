import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types/index'
import { parseHeaders } from './helper/headers'
import { createError } from "./helper/error";
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config


    const request = new XMLHttpRequest()
    if (timeout) {
      request.timeout = timeout;
    }
    if (responseType) {
      request.responseType = responseType
    }

    request.ontimeout = function () {
      reject(
        createError(
          `Timeout of ${timeout} ms exceeded`,
          config,
          "TIMEOUT",
          request
        )
      );
    };
    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
        return;
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText

      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }
    request.onerror = function () {
      reject(createError(
        "Net Error",
        config,
        null,
        request
      ));
    };
    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request.status,
            response
          )
        );
      }
    }
  })
}