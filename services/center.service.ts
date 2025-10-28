import { apiClient } from "@/lib/api-client"
import type { Center } from "@/types/course"

const endpoint = "/centers"

export const centerService = {
  async getAll(): Promise<Center[]> {
    return apiClient.get<Center[]>(endpoint)
  },

  async getById(id: string): Promise<Center> {
    return apiClient.get<Center>(`${endpoint}/${id}`)
  },

  async create(data: Omit<Center, "id" | "createdAt" | "updatedAt">): Promise<Center> {
    return apiClient.post<Center>(endpoint, data)
  },

  async update(id: string, data: Partial<Omit<Center, "id" | "createdAt" | "updatedAt">>): Promise<Center> {
    return apiClient.patch<Center>(`${endpoint}/${id}`, data)
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`${endpoint}/${id}`)
  },
}
