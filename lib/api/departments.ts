import { apiClient } from "@/lib/api-client"
import type { Department } from "@/types/course"
import { mockDepartments } from "@/lib/mock-data"

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

export async function getAllDepartments(): Promise<Department[]> {
  return withMockFallback(() => apiClient.get<Department[]>("/departments"), mockDepartments)
}

export async function getDepartmentById(id: string): Promise<Department> {
  return withMockFallback(
    () => apiClient.get<Department>(`/departments/${id}`),
    mockDepartments.find((d) => d.id === id) || mockDepartments[0],
  )
}

export async function createDepartment(data: Omit<Department, "id" | "createdAt" | "updatedAt">): Promise<Department> {
  return withMockFallback(() => apiClient.post<Department>("/departments", data), {
    id: Date.now().toString(),
    ...data,
  } as Department)
}

export async function updateDepartment(
  id: string,
  data: Partial<Omit<Department, "id" | "createdAt" | "updatedAt">>,
): Promise<Department> {
  return withMockFallback(() => apiClient.patch<Department>(`/departments/${id}`, data), {
    ...(mockDepartments.find((d) => d.id === id) || mockDepartments[0]),
    ...data,
  } as Department)
}

export async function deleteDepartment(id: string): Promise<void> {
  return withMockFallback(() => apiClient.delete<void>(`/departments/${id}`), undefined as void)
}
