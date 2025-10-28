import { apiClient } from "@/lib/api-client"
import type { Turn } from "@/types/course"
import { mockTurns } from "@/lib/mock-data"

async function withMockFallback<T>(apiCall: () => Promise<T>, mockData: T): Promise<T> {
  try {
    return await apiCall()
  } catch (error) {
    if (error instanceof Error && error.message === "API_NOT_AVAILABLE") {
      console.warn("[v0] API no disponible, usando datos mock")
      return mockData
    }
    throw error
  }
}

export async function getAllTurns(): Promise<Turn[]> {
  return withMockFallback(() => apiClient.get<Turn[]>("/turns"), mockTurns)
}

export async function getTurnById(id: string): Promise<Turn> {
  return withMockFallback(() => apiClient.get<Turn>(`/turns/${id}`), mockTurns.find((t) => t.id === id) || mockTurns[0])
}

export async function createTurn(data: Omit<Turn, "id" | "createdAt" | "updatedAt">): Promise<Turn> {
  return withMockFallback(() => apiClient.post<Turn>("/turns", data), {
    id: Date.now().toString(),
    ...data,
  } as Turn)
}

export async function updateTurn(
  id: string,
  data: Partial<Omit<Turn, "id" | "createdAt" | "updatedAt">>,
): Promise<Turn> {
  return withMockFallback(() => apiClient.patch<Turn>(`/turns/${id}`, data), {
    ...(mockTurns.find((t) => t.id === id) || mockTurns[0]),
    ...data,
  } as Turn)
}

export async function deleteTurn(id: string): Promise<void> {
  return withMockFallback(() => apiClient.delete<void>(`/turns/${id}`), undefined as void)
}
