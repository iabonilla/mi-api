import { apiClient } from "@/lib/api-client"
import type { TipoOferta } from "@/types/course"

const endpoint = "/tipo-ofertas"

export const tipoOfertaService = {
  async getAll(): Promise<TipoOferta[]> {
    return apiClient.get<TipoOferta[]>(endpoint)
  },

  async getById(id: string): Promise<TipoOferta> {
    return apiClient.get<TipoOferta>(`${endpoint}/${id}`)
  },

  async create(data: Omit<TipoOferta, "id">): Promise<TipoOferta> {
    return apiClient.post<TipoOferta>(endpoint, data)
  },

  async update(id: string, data: Partial<TipoOferta>): Promise<TipoOferta> {
    return apiClient.patch<TipoOferta>(`${endpoint}/${id}`, data)
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`${endpoint}/${id}`)
  },
}