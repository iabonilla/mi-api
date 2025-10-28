import { apiClient } from "@/lib/api-client"
import type { Course, CreateCourseDto, UpdateCourseDto, CourseFilters } from "@/types/course"

const endpoint = "/courses"

export const courseService = {
  async getAll(filters?: CourseFilters): Promise<Course[]> {
    const queryParams = new URLSearchParams()

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, String(value))
        }
      })
    }

    const query = queryParams.toString()
    const url = query ? `${endpoint}?${query}` : endpoint

    return apiClient.get<Course[]>(url)
  },

  async getById(id: string): Promise<Course> {
    return apiClient.get<Course>(`${endpoint}/${id}`)
  },

  async create(data: CreateCourseDto): Promise<Course> {
    return apiClient.post<Course>(endpoint, data)
  },

  async update(id: string, data: UpdateCourseDto): Promise<Course> {
    return apiClient.patch<Course>(`${endpoint}/${id}`, data)
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`${endpoint}/${id}`)
  },

  async getByDepartment(departmentId: string): Promise<Course[]> {
    return apiClient.get<Course[]>(`${endpoint}/department/${departmentId}`)
  },

  async getByCenter(centerId: string): Promise<Course[]> {
    return apiClient.get<Course[]>(`${endpoint}/center/${centerId}`)
  },

  async getByModality(modality: "presencial" | "virtual"): Promise<Course[]> {
    return apiClient.get<Course[]>(`${endpoint}/modality/${modality}`)
  },
}
