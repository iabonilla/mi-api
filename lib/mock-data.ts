import type { Course, Department, Center, Turn } from "@/types/course"

export const mockDepartments: Department[] = [
  { id: "1", name: "Inglés", code: "ENG" },
  { id: "2", name: "Francés", code: "FRA" },
  { id: "3", name: "Alemán", code: "DEU" },
  { id: "4", name: "Portugués", code: "POR" },
  { id: "5", name: "Italiano", code: "ITA" },
]

export const mockCenters: Center[] = [
  { id: "1", name: "Centro Managua", code: "MGA", departmentId: "1" },
  { id: "2", name: "Centro León", code: "LEO", departmentId: "1" },
  { id: "3", name: "Centro Granada", code: "GRA", departmentId: "1" },
  { id: "4", name: "Centro Masaya", code: "MSY", departmentId: "2" },
  { id: "5", name: "Centro Estelí", code: "EST", departmentId: "2" },
]

export const mockTurns: Turn[] = [
  { id: "1", name: "Matutino", code: "MAT", startTime: "07:00", endTime: "12:00" },
  { id: "2", name: "Vespertino", code: "VES", startTime: "13:00", endTime: "18:00" },
  { id: "3", name: "Nocturno", code: "NOC", startTime: "18:00", endTime: "21:00" },
  { id: "4", name: "Sabatino", code: "SAB", startTime: "08:00", endTime: "16:00" },
]

export const mockCourses: Course[] = [
  {
    id: "1",
    name: "Inglés Básico I",
    code: "ENG-101",
    description: "Curso introductorio de inglés para principiantes",
    level: "Básico",
    modality: "presencial",
    duration: 40,
    departmentId: "1",
    centerId: "1",
    turnId: "1",
    capacity: 25,
    enrolled: 18,
    startDate: "2025-02-01",
    endDate: "2025-04-30",
    status: "active",
  },
  {
    id: "2",
    name: "Inglés Intermedio",
    code: "ENG-201",
    description: "Curso de inglés nivel intermedio",
    level: "Intermedio",
    modality: "virtual",
    duration: 60,
    departmentId: "1",
    centerId: "1",
    turnId: "2",
    capacity: 30,
    enrolled: 25,
    startDate: "2025-02-15",
    endDate: "2025-05-15",
    status: "active",
  },
  {
    id: "3",
    name: "Francés Básico",
    code: "FRA-101",
    description: "Introducción al idioma francés",
    level: "Básico",
    modality: "presencial",
    duration: 40,
    departmentId: "2",
    centerId: "4",
    turnId: "3",
    capacity: 20,
    enrolled: 12,
    startDate: "2025-03-01",
    endDate: "2025-05-30",
    status: "active",
  },
]
