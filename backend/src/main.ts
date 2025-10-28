import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Habilitar CORS para el frontend
  app.enableCors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })

  // Prefijo global para todas las rutas
  app.setGlobalPrefix("api")

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  await app.listen(3005)
  console.log(`🚀 API corriendo en: http://localhost:3005/api`)
}

bootstrap()
