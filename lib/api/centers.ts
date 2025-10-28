import { apiClient } from "@/lib/api-client"
import type { Center } from "@/types/course"
import { mockCenters } from "@/lib/mock-data"

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

export async function getAllCenters(): Promise<Center[]> {
  return withMockFallback(() => apiClient.get<Center[]>("/centers"), mockCenters)
}

export async function getCenterById(id: string): Promise<Center> {
  return withMockFallback(
    () => apiClient.get<Center>(`/centers/${id}`),
    mockCenters.find((c) => c.id === id) || mockCenters[0],
  )
}

export async function createCenter(data: Omit<Center, "id" | "createdAt" | "updatedAt">): Promise<Center> {
  return withMockFallback(() => apiClient.post<Center>("/centers", data), {
    id: Date.now().toString(),
    ...data,
  } as Center)
}

export async function updateCenter(
  id: string,
  data: Partial<Omit<Center, "id" | "createdAt" | "updatedAt">>,
): Promise<Center> {
  return withMockFallback(() => apiClient.patch<Center>(`/centers/${id}`, data), {
    ...(mockCenters.find((c) => c.id === id) || mockCenters[0]),
    ...data,
  } as Center)
}

export async function deleteCenter(id: string): Promise<void> {
  return withMockFallback(() => apiClient.delete<void>(`/centers/${id}`), undefined as void)
}
