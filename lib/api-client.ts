type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

interface RequestOptions {
  method?: HttpMethod
  body?: any
  headers?: HeadersInit
  cache?: RequestCache
}

class ApiClient {
  private baseURL: string
  private apiAvailable: boolean | null = null

  constructor(baseURL?: string) {
    this.baseURL = baseURL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"
  }

  async checkApiAvailability(): Promise<boolean> {
    if (this.apiAvailable !== null) {
      return this.apiAvailable
    }

    try {
      const response = await fetch(`${this.baseURL}/health`, {
        method: "GET",
        cache: "no-store",
      })
      this.apiAvailable = response.ok
      return this.apiAvailable
    } catch {
      this.apiAvailable = false
      return false
    }
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

      const contentType = response.headers.get("content-type")

      if (!response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const error = await response.json().catch(() => ({ message: "Error desconocido" }))
          throw new Error(error.message || `HTTP Error: ${response.status}`)
        } else {
          throw new Error("API_NOT_AVAILABLE")
        }
      }

      if (response.status === 204) {
        return null as T
      }

      if (contentType && contentType.includes("application/json")) {
        return await response.json()
      } else {
        throw new Error("API_NOT_AVAILABLE")
      }
    } catch (error) {
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
