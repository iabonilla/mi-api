"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useIdiomas } from "@/hooks/use-idiomas"
import { Spinner } from "@/components/ui/spinner"

interface LanguageFilterProps {
  onLanguageSelect?: (languageId: number | null) => void
  selectedLanguage?: number | null
}

export function LanguageFilter({ onLanguageSelect, selectedLanguage }: LanguageFilterProps) {
  const [showAll, setShowAll] = useState(false)
  const { idiomas, loading, error } = useIdiomas()

  const displayedLanguages = showAll ? idiomas : idiomas.slice(0, 6)

  const toggleLanguage = (languageId: number) => {
    const newSelection = selectedLanguage === languageId ? null : languageId
    onLanguageSelect?.(newSelection)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
          {[...Array(6)].map((_, index) => (
            <Button
              key={index}
              variant="outline"
              disabled
              className="border-border text-muted-foreground"
            >
              <Spinner className="h-4 w-4 mr-2" />
              Cargando...
            </Button>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="text-center py-4 text-destructive text-sm">
          Error cargando idiomas
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
          <Button
            variant="outline"
            disabled
            className="border-border text-muted-foreground"
          >
            No disponible
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
        {displayedLanguages.map((language) => (
          <Button
            key={language.id}
            variant={selectedLanguage === language.id ? "default" : "outline"}
            className={
              selectedLanguage === language.id
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "border-border text-foreground hover:bg-primary/20 hover:text-primary-foreground hover:border-primary/30"
            }
            onClick={() => toggleLanguage(language.id)}
          >
            {language.nombre}
          </Button>
        ))}
      </div>
      
      {idiomas.length > 6 && (
        <Button
          variant="ghost"
          className="w-full text-muted-foreground hover:text-foreground"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? (
            <>
              <ChevronUp className="mr-2 h-4 w-4" />
              Mostrar menos
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 h-4 w-4" />
              Mostrar todos ({idiomas.length - 6} más)
            </>
          )}
        </Button>
      )}
    </div>
  )
}