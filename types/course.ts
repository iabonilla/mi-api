export interface Course {
  id: string
  name: string
  code: string
  description?: string
  departmentId: string
  centerId: string
  turnId: string
  modality: "presencial" | "virtual"
  capacity: number
  enrolled: number
  startDate: string
  endDate: string
  schedule?: string
  teacher?: string
  status: "active" | "inactive" | "full"
  createdAt: string
  updatedAt: string
}

export interface Department {
  id: string
  name: string
  code: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Center {
  id: string
  name: string
  code: string
  address?: string
  city?: string
  phone?: string
  createdAt: string
  updatedAt: string
}

export interface Turn {
  id: string
  name: string
  code: string
  startTime: string
  endTime: string
  createdAt: string
  updatedAt: string
}

export interface CreateCourseDto {
  name: string
  code: string
  description?: string
  departmentId: string
  centerId: string
  turnId: string
  modality: "presencial" | "virtual"
  capacity: number
  startDate: string
  endDate: string
  schedule?: string
  teacher?: string
}

export interface UpdateCourseDto extends Partial<CreateCourseDto> {}

export interface CourseFilters {
  departmentId?: string
  centerId?: string
  turnId?: string
  modality?: "presencial" | "virtual"
  status?: "active" | "inactive" | "full"
  search?: string
}
