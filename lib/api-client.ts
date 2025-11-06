// lib/api-client.ts
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

interface RequestOptions {
  method?: HttpMethod
  body?: any
  headers?: HeadersInit
  cache?: RequestCache
}

class ApiClient {
  private baseURL: string

  constructor(baseURL?: string) {
    // SOLUCIÓN: Usar URL completa en lugar de ruta relativa
    this.baseURL = baseURL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005/api'
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = "GET", body, headers = {}, cache = "no-store" } = options

    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      cache,
    }

    if (body) {
      config.body = JSON.stringify(body)
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      // Para respuestas sin contenido (DELETE exitoso)
      if (response.status === 204) {
        return null as T
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  async get<T>(endpoint: string, cache?: RequestCache): Promise<T> {
    return this.request<T>(endpoint, { method: "GET", cache })
  }

  async post<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, { method: "POST", body })
  }

  async put<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, { method: "PUT", body })
  }

  async patch<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, { method: "PATCH", body })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" })
  }
}

export const apiClient = new ApiClient()