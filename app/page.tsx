import { Header } from "@/components/header"
import { RequirementsSection } from "@/components/requirements-section"
import { CourseFilters } from "@/components/course-filters"
import { CourseList } from "@/components/course-list"
import { Toaster } from "@/components/ui/toaster"
// import { ApiConfigWarning } from "@/components/api-config-warning"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* <ApiConfigWarning /> */}
        <RequirementsSection />
        <CourseFilters />
        <div className="mt-8">
          <CourseList />
        </div>
      </main>
      <Toaster />
    </div>
  )
}
