import { apiClient } from "@/lib/api-client"
import type { Centro } from "@/types/course"

const endpoint = "/centros" // Tu endpoint real

export const centerService = {
  async getAll(): Promise<Centro[]> {
    return apiClient.get<Centro[]>(endpoint)
  },

  async getById(id: string): Promise<Centro> {
    return apiClient.get<Centro>(`${endpoint}/${id}`)
  },

  async create(data: Omit<Centro, "id">): Promise<Centro> {
    return apiClient.post<Centro>(endpoint, data)
  },

  async update(id: string, data: Partial<Centro>): Promise<Centro> {
    return apiClient.patch<Centro>(`${endpoint}/${id}`, data)
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`${endpoint}/${id}`)
  },
}