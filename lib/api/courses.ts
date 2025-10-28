import { apiClient } from "@/lib/api-client"
import type { Course, CreateCourseDto, UpdateCourseDto, CourseFilters } from "@/types/course"
import { mockCourses } from "@/lib/mock-data"

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

export async function getAllCourses(filters?: CourseFilters): Promise<Course[]> {
  const queryParams = new URLSearchParams()

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, String(value))
      }
    })
  }

  const query = queryParams.toString()
  const url = query ? `/courses?${query}` : "/courses"

  return withMockFallback(() => apiClient.get<Course[]>(url), mockCourses)
}

export async function getCourseById(id: string): Promise<Course> {
  return withMockFallback(
    () => apiClient.get<Course>(`/courses/${id}`),
    mockCourses.find((c) => c.id === id) || mockCourses[0],
  )
}

export async function createCourse(data: CreateCourseDto): Promise<Course> {
  return withMockFallback(() => apiClient.post<Course>("/courses", data), {
    id: Date.now().toString(),
    ...data,
    enrolled: 0,
    status: "active",
  } as Course)
}

export async function updateCourse(id: string, data: UpdateCourseDto): Promise<Course> {
  return withMockFallback(() => apiClient.patch<Course>(`/courses/${id}`, data), {
    ...(mockCourses.find((c) => c.id === id) || mockCourses[0]),
    ...data,
  } as Course)
}

export async function deleteCourse(id: string): Promise<void> {
  return withMockFallback(() => apiClient.delete<void>(`/courses/${id}`), undefined as void)
}

export async function getCoursesByDepartment(departmentId: string): Promise<Course[]> {
  return withMockFallback(
    () => apiClient.get<Course[]>(`/courses/department/${departmentId}`),
    mockCourses.filter((c) => c.departmentId === departmentId),
  )
}

export async function getCoursesByCenter(centerId: string): Promise<Course[]> {
  return withMockFallback(
    () => apiClient.get<Course[]>(`/courses/center/${centerId}`),
    mockCourses.filter((c) => c.centerId === centerId),
  )
}

export async function getCoursesByModality(modality: "presencial" | "virtual"): Promise<Course[]> {
  return withMockFallback(
    () => apiClient.get<Course[]>(`/courses/modality/${modality}`),
    mockCourses.filter((c) => c.modality === modality),
  )
}
