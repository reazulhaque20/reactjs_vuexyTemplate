import { defu } from 'defu'


export const useApi= (url, options = {}) => {
  const config = useRuntimeConfig()
  const accessToken = useCookie('accessToken')

  const defaults = {
    baseURL: config.public.apiBaseUrl,
    key: toValue(url),
    headers: accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : {},
  }

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults)

  return useFetch(url, params)
}