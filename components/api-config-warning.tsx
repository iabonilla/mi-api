// components/api-config-warning.tsx - ACTUALIZADO
"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export function ApiConfigWarning() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  // CORREGIDO: Cambiar a tu puerto 3005
  if (apiUrl && apiUrl === "http://localhost:3005/api") {
    return null
  }

  return (
    <Alert className="mb-6 border-blue-500/50 bg-blue-500/10">
      <Info className="h-4 w-4 text-blue-500" />
      <AlertTitle className="text-blue-500">Configuración de API Requerida</AlertTitle>
      <AlertDescription className="text-blue-400">
        Para conectar con tu API de NestJS, configura la variable de entorno{" "}
        <code className="bg-blue-500/20 px-1 py-0.5 rounded">NEXT_PUBLIC_API_URL</code>.
        <br />
        <br />
        Crea un archivo <code className="bg-blue-500/20 px-1 py-0.5 rounded">.env.local</code> en la raíz del proyecto
        con:
        <br />
        <code className="bg-blue-500/20 px-2 py-1 rounded block mt-2">
          NEXT_PUBLIC_API_URL=http://localhost:3005/api
        </code>
        <br />
        <span className="text-sm text-muted-foreground">
          Mientras tanto, la aplicación funcionará con datos de ejemplo.
        </span>
      </AlertDescription>
    </Alert>
  )
}