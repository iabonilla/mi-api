import { apiClient } from "@/lib/api-client"
import type { Turn } from "@/types/course"

const endpoint = "/turns" // Tu endpoint real

export const turnService = {
  async getAll(): Promise<Turn[]> {
    return apiClient.get<Turn[]>(endpoint)
  },

  async getById(id: string): Promise<Turn> {
    return apiClient.get<Turn>(`${endpoint}/${id}`)
  },

  async create(data: Omit<Turn, "id">): Promise<Turn> {
    return apiClient.post<Turn>(endpoint, data)
  },

  async update(id: string, data: Partial<Turn>): Promise<Turn> {
    return apiClient.patch<Turn>(`${endpoint}/${id}`, data)
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`${endpoint}/${id}`)
  },
}