import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios"
import { logger } from "./logger"

export class HttpClient {
  private client: AxiosInstance

  constructor(baseURL: string, timeout = 10000) {
    this.client = axios.create({
      baseURL,
      timeout,
      headers: {
        "Content-Type": "application/json",
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        logger.info(`HTTP Request: ${config.method?.toUpperCase()} ${config.url}`)
        return config
      },
      (error) => {
        logger.error("HTTP Request Error:", error)
        return Promise.reject(error)
      },
    )

    this.client.interceptors.response.use(
      (response) => {
        logger.info(`HTTP Response: ${response.status} ${response.config.url}`)
        return response
      },
      (error) => {
        logger.error("HTTP Response Error:", error.response?.data || error.message)
        return Promise.reject(error)
      },
    )
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get(url, config)
    return response.data
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post(url, data, config)
    return response.data
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete(url, config)
    return response.data
  }
}
