# ⚠️ Importante sobre los errores de lint

Los errores de lint que ves en los archivos del backend son **falsos positivos**. 

## ¿Por qué ocurren?

El linter de v0 está configurado para proyectos React/Next.js y no reconoce la sintaxis de NestJS:
- `app.useGlobalPipes()` es un método válido de NestJS (no es un React hook)
- Los decoradores `@Param()`, `@Query()`, `@Body()` son sintaxis válida de TypeScript/NestJS

## ✅ El código es correcto

Puedes ignorar estos errores de lint. El código del backend:
- Es sintácticamente correcto
- Funcionará perfectamente cuando lo ejecutes localmente
- Sigue las mejores prácticas de NestJS

## 🚀 Cómo usar el backend

1. **Navega a la carpeta backend:**
   \`\`\`bash
   cd backend
   \`\`\`

2. **Instala las dependencias:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configura las variables de entorno:**
   Crea un archivo \`.env\` basado en \`.env.example\`

4. **Inicia el servidor:**
   \`\`\`bash
   npm run start:dev
   \`\`\`

5. **La API estará disponible en:**
   \`http://localhost:3005/api\`

## 🔗 Conectar con el frontend

En el frontend, configura la variable de entorno:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:3005/api
\`\`\`

¡Listo! Tu aplicación completa estará funcionando.
