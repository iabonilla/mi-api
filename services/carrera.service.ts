import { apiClient } from "@/lib/api-client"
import type { Carrera } from "@/types/course"

const endpoint = "/carreras"

export const carreraService = {
  async getAll(): Promise<Carrera[]> {
    return apiClient.get<Carrera[]>(endpoint)
  },

  async getById(id: string): Promise<Carrera> {
    return apiClient.get<Carrera>(`${endpoint}/${id}`)
  },

  async create(data: Omit<Carrera, "id">): Promise<Carrera> {
    return apiClient.post<Carrera>(endpoint, data)
  },

  async update(id: string, data: Partial<Carrera>): Promise<Carrera> {
    return apiClient.patch<Carrera>(`${endpoint}/${id}`, data)
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`${endpoint}/${id}`)
  },
}