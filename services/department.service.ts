

import { apiClient } from "@/lib/api-client"
import type { Departamento } from "@/types/course"

const endpoint = "/departmentos" // Tu endpoint real

export const departmentService = {
  async getAll(): Promise<Departamento[]> {
    return apiClient.get<Departamento[]>(endpoint)
  },

  async getById(id: string): Promise<Departamento> {
    return apiClient.get<Departamento>(`${endpoint}/${id}`)
  },

  async create(data: Omit<Departamento, "id">): Promise<Departamento> {
    return apiClient.post<Departamento>(endpoint, data)
  },

  async update(id: string, data: Partial<Departamento>): Promise<Departamento> {
    return apiClient.patch<Departamento>(`${endpoint}/${id}`, data)
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`${endpoint}/${id}`)
  },
}
