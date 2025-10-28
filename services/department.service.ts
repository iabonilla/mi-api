import { apiClient } from "@/lib/api-client"
import type { Department } from "@/types/course"

const endpoint = "/departments"

export const departmentService = {
  async getAll(): Promise<Department[]> {
    return apiClient.get<Department[]>(endpoint)
  },

  async getById(id: string): Promise<Department> {
    return apiClient.get<Department>(`${endpoint}/${id}`)
  },

  async create(data: Omit<Department, "id" | "createdAt" | "updatedAt">): Promise<Department> {
    return apiClient.post<Department>(endpoint, data)
  },

  async update(id: string, data: Partial<Omit<Department, "id" | "createdAt" | "updatedAt">>): Promise<Department> {
    return apiClient.patch<Department>(`${endpoint}/${id}`, data)
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`${endpoint}/${id}`)
  },
}
