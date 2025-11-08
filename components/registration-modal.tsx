// components/registration-modal.tsx - VERSIÓN CON VALIDACIÓN
"use client"

import { useState, useEffect, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button" // ← Agregar
import { Curso } from "@/types/course"
import { PersonFormRegistration } from "@/components/person-form-registration"
import { EnrollmentSummary } from "@/components/enrollment-summary"
import { CheckCircle, User, AlertCircle } from "lucide-react" // ← Agregar

interface RegistrationModalProps {
  course: Curso | null
  open: boolean
  onOpenChange: (open: boolean) => void
  existingPersonData?: any
}

export function RegistrationModal({ course, open, onOpenChange, existingPersonData }: RegistrationModalProps) {
  const [activeTab, setActiveTab] = useState("person")
  const [personData, setPersonData] = useState<any>(null)

  // ✅ VALIDACIÓN: Verificar si los datos de persona están completos
  const isPersonDataComplete = useMemo(() => {
    const dataToCheck = personData || existingPersonData
    if (!dataToCheck) return false

    // Campos obligatorios para matricularse
    const requiredFields = [
      'id',
      'codigo', 
      'cedula',
      'nombre',
      'apellido',
      'email',
      'telefono'
    ]

    return requiredFields.every(field => 
      dataToCheck[field] && dataToCheck[field].toString().trim() !== ''
    )
  }, [personData, existingPersonData])

  // ✅ EFECTO: Si hay datos existentes completos, ir directamente a matrícula
  useEffect(() => {
    if (existingPersonData && open && isPersonDataComplete) {
      setPersonData(existingPersonData)
      setActiveTab("enrollment")
    }
  }, [existingPersonData, open, isPersonDataComplete])

  const handlePersonSuccess = (data: any) => {
    setPersonData(data)
    setActiveTab("enrollment")
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setActiveTab("person")
      setPersonData(null)
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[95vw] h-[70vh] rounded-lg " style={{ width: '80vw', maxWidth: '90vw' }} >
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            Inscripción a Curso
            {isPersonDataComplete && (
              <CheckCircle className="h-6 w-6 text-green-500" />
            )}
          </DialogTitle>
        </DialogHeader>
        
        {/* ✅ INDICADOR DE ESTADO */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-3">
            {isPersonDataComplete ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-semibold text-green-800">Datos de persona completos</p>
                  <p className="text-sm text-green-600">
                    {personData?.nombre || existingPersonData?.nombre} está listo para matricularse
                  </p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="font-semibold text-amber-800">Datos de persona incompletos</p>
                  <p className="text-sm text-amber-600">
                    Complete los datos personales para continuar con la matrícula
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger 
              value="person" 
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Datos Personales
              {isPersonDataComplete && (
                <CheckCircle className="h-3 w-3 text-green-500" />
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="enrollment" 
              disabled={!isPersonDataComplete} // ← Deshabilitar si no hay datos
            >
              Resumen de Matrícula
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="person" className="space-y-2">
            <PersonFormRegistration 
              course={course} 
              onSuccess={handlePersonSuccess}
              existingPersonData={existingPersonData}
              
            />
            
            {/* ✅ BOTÓN PARA CONTINUAR - Solo si los datos están completos */}
            {isPersonDataComplete && (
              <div className="flex justify-end pt-4">
                <Button 
                  onClick={() => setActiveTab("enrollment")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Continuar a Matrícula
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="enrollment" className="space-y-2">
            <EnrollmentSummary 
              course={course} 
              personData={personData || existingPersonData}
              onBack={() => setActiveTab("person")}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}