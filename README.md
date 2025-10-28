# Academia de Idiomas Héroe Brian Willson - SETEC

Sistema de gestión de cursos para la Academia de Idiomas.

## Configuración

### 1. Instalar dependencias

\`\`\`bash
npm install --legacy-peer-deps
\`\`\`

### 2. Configurar la API

Crea un archivo `.env.local` en la raíz del proyecto:

\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
\`\`\`

Reemplaza `http://localhost:3001/api` con la URL de tu API de NestJS.

### 3. Ejecutar el proyecto

\`\`\`bash
npm run dev
\`\`\`

El proyecto estará disponible en `http://localhost:3000`

## Estructura de la API

El frontend espera que tu API de NestJS tenga los siguientes endpoints:

### Cursos
- `GET /courses` - Listar todos los cursos
- `GET /courses/:id` - Obtener un curso por ID
- `POST /courses` - Crear un nuevo curso
- `PUT /courses/:id` - Actualizar un curso completo
- `PATCH /courses/:id` - Actualizar parcialmente un curso
- `DELETE /courses/:id` - Eliminar un curso

### Departamentos
- `GET /departments` - Listar todos los departamentos
- `GET /departments/:id` - Obtener un departamento por ID
- `POST /departments` - Crear un nuevo departamento
- `PUT /departments/:id` - Actualizar un departamento
- `DELETE /departments/:id` - Eliminar un departamento

### Centros
- `GET /centers` - Listar todos los centros
- `GET /centers/:id` - Obtener un centro por ID
- `POST /centers` - Crear un nuevo centro
- `PUT /centers/:id` - Actualizar un centro
- `DELETE /centers/:id` - Eliminar un centro

### Turnos
- `GET /turns` - Listar todos los turnos
- `GET /turns/:id` - Obtener un turno por ID
- `POST /turns` - Crear un nuevo turno
- `PUT /turns/:id` - Actualizar un turno
- `DELETE /turns/:id` - Eliminar un turno

## Tecnologías

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui

## Características

- ✅ Modo oscuro por defecto
- ✅ Sistema completo de CRUD para cursos
- ✅ Filtros por departamento, centro y turno
- ✅ Búsqueda de centros
- ✅ Notificaciones toast para feedback
- ✅ Manejo de errores robusto
- ✅ TypeScript para type-safety
- ✅ Responsive design
