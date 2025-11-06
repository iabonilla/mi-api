// components/enrollment-modal.tsx
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Curso } from "@/types/course"
import { StudentForm } from "@/components/student-form" // Asumimos que existe

interface EnrollmentModalProps {
  course: Curso | null
  isOpen: boolean
  onClose: () => void
}

export function EnrollmentModal({ course, isOpen, onClose }: EnrollmentModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Inscripción en {course?.nombre}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <StudentForm 
            course={course} 
            onSuccess={() => {
              onClose()
              // Mostrar un mensaje de éxito
            }} 
          />
        </div>
      </DialogContent>      
    </Dialog>
  )
}