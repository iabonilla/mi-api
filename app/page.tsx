// app/page.tsx - VERSIÓN FINAL
"use client";

import { useState } from "react";
import { Header } from "@/components/header"
import { RequirementsSection } from "@/components/requirements-section"
import { CourseFilters } from "@/components/course-filters"
import { Toaster } from "@/components/ui/toaster"
import { ApiConfigWarning } from "@/components/api-config-warning"

export default function HomePage() {
  // ✅ ESTADO COMPARTIDO - único lugar donde se almacenan los datos
  const [globalPersonData, setGlobalPersonData] = useState<any>(null);

  // ✅ DEBUG TEMPORAL
  console.log("🏠 HomePage - globalPersonData:", globalPersonData);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-wide py-6">
        <ApiConfigWarning />
        {/* ✅ RequirementsSection NOTIFICA cambios */}
        <RequirementsSection 
          onPersonDataUpdate={setGlobalPersonData}
        />
        {/* ✅ CourseFilters RECIBE datos */}
        <CourseFilters 
          currentPersonData={globalPersonData}
        />
      </main>
      <Toaster />
    </div>
  )
}