import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, ImageIcon, Award, Video } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RequirementsSection() {
  const requirements = [
    {
      icon: FileText,
      title: "Cédula / Partida de Nacimiento",
    },
    {
      icon: ImageIcon,
      title: "Fotografía Tamaño Carnet",
    },
    {
      icon: Award,
      title: "Diploma o Certificado de nota",
    },
  ]

  return (
    <div className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Requisitos</h2>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Video className="h-4 w-4" />
          Video Instructivo
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {requirements.map((req, index) => (
          <Card key={index} className="border-border bg-card hover:border-primary transition-colors">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <req.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg text-card-foreground">{req.title}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
