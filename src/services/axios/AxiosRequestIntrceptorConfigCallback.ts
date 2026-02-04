import appConfig from '@/configs/app.config'
import Cookies from 'js-cookie'
import {
    TOKEN_TYPE,
    REQUEST_HEADER_AUTH_KEY,
    TOKEN_NAME_IN_STORAGE,
} from '@/constants/api.constant'
import type { InternalAxiosRequestConfig } from 'axios'

const AxiosRequestIntrceptorConfigCallback = (
    config: InternalAxiosRequestConfig,
) => {
    const storage = appConfig.accessTokenPersistStrategy
    let accessToken = ''

    if (storage === 'localStorage') {
        accessToken = localStorage.getItem(TOKEN_NAME_IN_STORAGE) || ''
    } else if (storage === 'sessionStorage') {
        accessToken = sessionStorage.getItem(TOKEN_NAME_IN_STORAGE) || ''
    } else if (storage === 'cookies') {
        accessToken = Cookies.get(TOKEN_NAME_IN_STORAGE) || ''
    }

    if (accessToken) {
        config.headers[REQUEST_HEADER_AUTH_KEY] =
            `${TOKEN_TYPE}${accessToken}`
    }

    // Add x-api-key header from environment variable
    const apiKey = import.meta.env.VITE_API_KEY
    if (apiKey) {
        config.headers['x-api-key'] = apiKey
    }

    // Prevent browser caching - force fresh data on every request
    config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    config.headers['Pragma'] = 'no-cache'
    config.headers['Expires'] = '0'

    return config
}

export default AxiosRequestIntrceptorConfigCallback
