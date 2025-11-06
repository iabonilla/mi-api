import { apiClient } from "@/lib/api-client"
import type { TipoCurso } from "@/types/course"

const endpoint = "/tipo-Cursos"

export const tipoCursoService = {
  async getAll(): Promise<TipoCurso[]> {
    return apiClient.get<TipoCurso[]>(endpoint)
  },

  async getById(id: string): Promise<TipoCurso> {
    return apiClient.get<TipoCurso>(`${endpoint}/${id}`)
  },

  async create(data: Omit<TipoCurso, "id">): Promise<TipoCurso> {
    return apiClient.post<TipoCurso>(endpoint, data)
  },

  async update(id: string, data: Partial<TipoCurso>): Promise<TipoCurso> {
    return apiClient.patch<TipoCurso>(`${endpoint}/${id}`, data)
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`${endpoint}/${id}`)
  },
}