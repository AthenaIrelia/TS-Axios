import { AxiosRequestConfig } from './types/index'
import xhr from './xhr';
import { buildURL } from './helper/url'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}
function processConfig(config: AxiosRequestConfig): void {
  config.url = transfromURL(config)
}
function transfromURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}
export default axios