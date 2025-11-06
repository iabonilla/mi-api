import { apiClient } from "@/lib/api-client"
import type { Idioma } from "@/types/course"

const endpoint = "/idiomas"

export const idiomaService = {
  async getAll(): Promise<Idioma[]> {
    return await apiClient.get(endpoint)
  },

  async getById(id: string): Promise<Idioma> {
    return await apiClient.get(`${endpoint}/${id}`)
  }
}