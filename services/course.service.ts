// services/course.service.ts - ACTUALIZADO
import { apiClient } from "@/lib/api-client";
import type {
  Curso,
  CreateCursoDto,
  UpdateCursoDto,
  CourseFilters,
} from "@/types/course";

const endpoint = "/cursos";

export const courseService = {
  async getAll(filters?: CourseFilters): Promise<Curso[]> {
    const queryParams = new URLSearchParams();

 if (filters) {

 console.log("🌐 Preparando filtros para API:", filters);
    

      // Convertir valores numéricos explícitamente
      if (filters.tipo_oferta_id !== undefined && filters.tipo_oferta_id !== null) {
        queryParams.append('tipo_oferta_id', filters.tipo_oferta_id.toString())
      }
      if (filters.idioma_id !== undefined && filters.idioma_id !== null) {
        queryParams.append('idioma_id', filters.idioma_id.toString())
      }
      if (filters.centro_id !== undefined && filters.centro_id !== null) {
        queryParams.append('centro_id', filters.centro_id.toString())
      }
      if (filters.turno_id !== undefined && filters.turno_id !== null) {
        queryParams.append('turno_id', filters.turno_id.toString())
      }
      if (filters.estado !== undefined && filters.estado !== null) {
        queryParams.append('estado', filters.estado.toString())
      }
    }
    
    const query = queryParams.toString();
    //const url = query ? `${endpoint}?${query}` : endpoint;

    // CAMBIO IMPORTANTE: Usar endpoint /filtrado que SÍ funciona
    const url = query ? `${endpoint}/filtrado?${query}` : `${endpoint}/filtrado`;
      
    console.log("🌐 URL final de la API:", url);

    return await apiClient.get(url); 
  },



  async getById(id: string): Promise<Curso> {
    return await apiClient.get(`${endpoint}/${id}`);
  },

  async create(data: CreateCursoDto): Promise<Curso> {
    return await apiClient.post(endpoint, data);
  },

  async update(id: string, data: UpdateCursoDto): Promise<Curso> {
    return await apiClient.patch(`${endpoint}/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`${endpoint}/${id}`);
  },
};
