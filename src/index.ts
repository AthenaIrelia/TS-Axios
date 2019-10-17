import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import { transformRequest, transformResponse } from './helper/data'
import { processHeaders } from './helper/headers'
import xhr from './xhr';
import { buildURL } from './helper/url'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
function processConfig(config: AxiosRequestConfig): void {
  config.url = transfromURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}
function transfromURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
export default axios