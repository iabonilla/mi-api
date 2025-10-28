# API Academia de Idiomas Héroe Brian Willson

API REST construida con NestJS para gestionar cursos, departamentos, centros y turnos de la Academia de Idiomas.

## 🚀 Instalación

\`\`\`bash
# Instalar dependencias
npm install
\`\`\`

## ⚙️ Configuración

1. Crea un archivo `.env` en la raíz del proyecto backend:

\`\`\`env
PORT=3005
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=tu_password
DB_DATABASE=academia_idiomas
\`\`\`

2. Asegúrate de tener MySQL instalado y corriendo
3. La base de datos se creará automáticamente al iniciar la aplicación

## 🏃 Ejecutar la aplicación

\`\`\`bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod
\`\`\`

La API estará disponible en: `http://localhost:3005/api`

## 📚 Endpoints disponibles

### Cursos
- `GET /api/courses` - Listar todos los cursos (con filtros opcionales)
- `GET /api/courses/:id` - Obtener un curso por ID
- `POST /api/courses` - Crear un nuevo curso
- `PATCH /api/courses/:id` - Actualizar un curso
- `DELETE /api/courses/:id` - Eliminar un curso

### Departamentos
- `GET /api/departments` - Listar todos los departamentos
- `GET /api/departments/:id` - Obtener un departamento por ID
- `POST /api/departments` - Crear un nuevo departamento
- `PATCH /api/departments/:id` - Actualizar un departamento
- `DELETE /api/departments/:id` - Eliminar un departamento

### Centros
- `GET /api/centers` - Listar todos los centros
- `GET /api/centers/:id` - Obtener un centro por ID
- `POST /api/centers` - Crear un nuevo centro
- `PATCH /api/centers/:id` - Actualizar un centro
- `DELETE /api/centers/:id` - Eliminar un centro

### Turnos
- `GET /api/turns` - Listar todos los turnos
- `GET /api/turns/:id` - Obtener un turno por ID
- `POST /api/turns` - Crear un nuevo turno
- `PATCH /api/turns/:id` - Actualizar un turno
- `DELETE /api/turns/:id` - Eliminar un turno

## 🔧 Características

- ✅ CRUD completo para todas las entidades
- ✅ Validación de datos con class-validator
- ✅ TypeORM para gestión de base de datos
- ✅ CORS habilitado para el frontend
- ✅ Manejo silencioso de errores en desarrollo
- ✅ Relaciones entre entidades
- ✅ Filtros avanzados para cursos

## 🗄️ Base de datos

La aplicación usa MySQL y TypeORM con sincronización automática en desarrollo. Las tablas se crearán automáticamente al iniciar la aplicación.
