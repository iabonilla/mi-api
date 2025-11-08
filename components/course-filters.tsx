// components/course-filters.tsx - VERSIÓN FINAL CORREGIDA
"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LanguageFilter } from "@/components/language-filter";
import { DepartmentFilter } from "@/components/department-filter";
import { CenterFilter } from "@/components/center-filter";
import { TurnFilter } from "@/components/turn-filter";
import { CourseList } from "@/components/course-list";
import {
  MapPin,
  Building2,
  Clock,
  Search,
  Languages,
  RotateCcw,
} from "lucide-react";
import type { Modalidad, CourseFilters } from "@/types/course";
import { useJerarquiaFiltros } from "@/hooks/use-jerarquia-filtros";

interface CourseFiltersProps {
  onFiltersChange?: (filters: any) => void;
  currentPersonData?: any;
}

// Control global
let globalInitDone = false;

export function CourseFilters({
  onFiltersChange,
  currentPersonData,
}: CourseFiltersProps) {
  console.log("🔄 CourseFilters render");

  const [modalidad, setModalidad] = useState<Modalidad>("presencial");
  const [selectedDepartamento, setSelectedDepartamento] = useState<
    number | null
  >(null);
  const [selectedCentro, setSelectedCentro] = useState<number | null>(null);
  const [selectedIdioma, setSelectedIdioma] = useState<number | null>(null);
  const [selectedTurno, setSelectedTurno] = useState<number | null>(null);
  const [appliedFilters, setAppliedFilters] = useState<CourseFilters>({});

  const initRef = useRef({ depto: false, centro: false });

  // Hook optimizado (ahora con useMemo interno)
  const hookParams = useMemo(
    () => selectedDepartamento ?? undefined,
    [selectedDepartamento]
  );
  const {
    departamentos,
    centros,
    loading: jerarquiaLoading,
  } = useJerarquiaFiltros(hookParams);

  // Inicialización controlada
  useEffect(() => {
    if (globalInitDone || departamentos.length === 0 || selectedDepartamento)
      return;

    console.log("🎯 INIT: Primer departamento");
    setSelectedDepartamento(departamentos[0].id);
    initRef.current.depto = true;
    globalInitDone = true;
  }, [departamentos, selectedDepartamento]);

  useEffect(() => {
    if (!selectedDepartamento || centros.length === 0 || selectedCentro) return;

    console.log("🎯 INIT: Primer centro");
    setSelectedCentro(centros[0].id);
    initRef.current.centro = true;
  }, [centros, selectedDepartamento, selectedCentro]);

  // MEMO: Calcular hasFilters
  const hasFilters = useMemo(() => {
    return (
      selectedIdioma !== null ||
      selectedDepartamento !== null ||
      selectedCentro !== null ||
      selectedTurno !== null
    );
  }, [selectedIdioma, selectedDepartamento, selectedCentro, selectedTurno]);

  // HANDLERS optimizados
  const handleSearch = useCallback(() => {
    const tipo_oferta_id = modalidad === "presencial" ? 1 : 2;

    const apiFilters =
      modalidad === "presencial"
        ? {
            tipo_oferta_id,
            idioma_id: selectedIdioma || undefined,
            centro_id: selectedCentro || undefined,
            turno_id: selectedTurno || undefined,
          }
        : {
            tipo_oferta_id,
            idioma_id: selectedIdioma || undefined,
          };

    console.log(`🔍 APLICANDO FILTROS para ${modalidad}:`, apiFilters);
    setAppliedFilters(apiFilters);
    onFiltersChange?.(apiFilters);
  }, [
    modalidad,
    selectedIdioma,
    selectedCentro,
    selectedTurno,
    onFiltersChange,
  ]);

  const handleTabChange = useCallback((value: string) => {
    setModalidad(value as Modalidad);
    setAppliedFilters({});
  }, []);

  const handleDepartmentSelect = useCallback((departmentId: number | null) => {
    setSelectedDepartamento(departmentId);
    setSelectedCentro(null);
    setAppliedFilters({});
  }, []);

  const handleCenterSelect = useCallback((centerId: number | null) => {
    setSelectedCentro(centerId);
    setAppliedFilters({});
  }, []);

  const handleLanguageSelect = useCallback((languageId: number | null) => {
    setSelectedIdioma(languageId);
    setAppliedFilters({});
  }, []);

  const handleTurnSelect = useCallback((turnId: number | null) => {
    setSelectedTurno(turnId);
    setAppliedFilters({});
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedIdioma(null);
    setSelectedDepartamento(null);
    setSelectedCentro(null);
    setSelectedTurno(null);
    setAppliedFilters({});
    onFiltersChange?.({});
  }, [onFiltersChange]);

  // Filtros actuales
  const currentFilters = useMemo(() => {
    if (Object.keys(appliedFilters).length > 0) {
      return appliedFilters;
    }

    return modalidad === "presencial"
      ? { tipo_oferta_id: 1 }
      : { tipo_oferta_id: 2 };
  }, [appliedFilters, modalidad]);

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20 bg-white card-shadow-blue transition-all duration-300 hover:card-shadow-blue-hover">
        <CardContent className="pt-1">
          <Tabs
            defaultValue="presencial"
            className="w-full"
            onValueChange={handleTabChange}
          >
            <div className="flex items-center justify-between mb-4 p-5 from-slate-50 to-blue-100/30 rounded-2xl border border-blue-100/50 shadow-sm">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-2">
                  Buscar cursos disponibles
                </h2>
                <p className="text-lg text-primary/80">
                  Explore y matricúlese en nuestra amplia oferta de cursos de
                  idiomas
                </p>
              </div>

              <TabsList className="bg-muted/50 p-1 border border-primary/10">
                <TabsTrigger
                  value="presencial"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white font-semibold transition-all duration-200"
                >
                  Oferta presencial
                </TabsTrigger>
                <TabsTrigger
                  value="virtual"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white font-semibold transition-all duration-200"
                >
                  Oferta virtual
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="presencial" className="space-y-6 mt-0">
              <div className="grid gap-6 md:grid-cols-4">
                {/* Filtro de Idiomas */}
                <Card className="border border-primary/15 bg-white card-shadow-blue transition-shadow duration-200 hover:card-shadow-blue-hover">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Languages className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-card-foreground text-base font-semibold">
                        Idiomas
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <LanguageFilter
                      onLanguageSelect={handleLanguageSelect}
                      selectedLanguage={selectedIdioma}
                    />
                  </CardContent>
                </Card>

                {/* Filtro de Departamentos */}
                <Card className="border border-primary/15 bg-white card-shadow-blue transition-shadow duration-200 hover:card-shadow-blue-hover">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-card-foreground text-base font-semibold">
                        Departamentos
                        {departamentos.length > 0 && (
                          <span className="text-sm text-muted-foreground ml-2">
                            ({departamentos.length} disponibles)
                          </span>
                        )}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <DepartmentFilter
                      onDepartmentSelect={handleDepartmentSelect}
                      selectedDepartment={selectedDepartamento}
                    />
                  </CardContent>
                </Card>

                {/* Filtro de Turnos */}
                <Card className="border border-primary/15 bg-white card-shadow-blue transition-shadow duration-200 hover:card-shadow-blue-hover">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-card-foreground text-base font-semibold">
                        Turnos
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <TurnFilter
                      onTurnSelect={handleTurnSelect}
                      selectedTurn={selectedTurno}
                    />
                  </CardContent>
                </Card>

                {/* Filtro de Centros */}
                <Card className="border border-primary/15 bg-white card-shadow-blue transition-shadow duration-200 hover:card-shadow-blue-hover">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-card-foreground text-base font-semibold">
                        Centros
                        {selectedDepartamento && (
                          <span className="text-sm text-muted-foreground ml-2">
                            ({centros.length} disponibles)
                          </span>
                        )}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent> 
                    <CenterFilter
                      municipioId={selectedDepartamento}
                      centros={centros}
                      onCenterSelect={handleCenterSelect}
                      selectedCenter={selectedCentro}
                      loading={jerarquiaLoading}
                      />
                  </CardContent>
                </Card>
              </div>

              {/* Botones alineados */}
              <div className="flex justify-center gap-4 pt-2">
                <Button
                  size="lg"
                  className="btn-primary px-8 gap-2 font-semibold text-lg py-3 transition-all duration-200 hover:scale-105"
                  onClick={handleSearch}
                  disabled={!hasFilters}
                  >
                  <Search className="h-5 w-5" />
                  {hasFilters
                    ? "Buscar Cursos Presenciales"
                    : "Seleccione filtros para buscar"}
                </Button>

                {hasFilters && (
                  <Button
                  variant="outline"
                  size="lg"
                  onClick={handleClearFilters}
                  className="px-8 gap-2 font-semibold text-lg py-3 transition-all duration-200"
                  >
                    <RotateCcw className="h-5 w-5" />
                    Limpiar Filtros
                  </Button>
                )}
              </div>

              {hasFilters && (
                <div className="text-center mb-4">
                  <Badge variant="secondary">
                    Filtros activos:
                    {selectedIdioma && " Idioma"}
                    {selectedDepartamento && " Departamento"}
                    {selectedCentro && " Centro"}
                    {selectedTurno && " Turno"}
                  </Badge>
                </div>
              )}              

              <CourseList
                filters={currentFilters}
                currentPersonData={currentPersonData}
              />
            </TabsContent>

            <TabsContent value="virtual" className="mt-0">
              <div className="grid gap-6 md:grid-cols-1 mb-6">
                <Card className="border border-primary/15 bg-white card-shadow-blue transition-shadow duration-200 hover:card-shadow-blue-hover">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Languages className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-card-foreground text-base font-semibold">
                        Idiomas Virtuales
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <LanguageFilter
                      onLanguageSelect={handleLanguageSelect}
                      selectedLanguage={selectedIdioma}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center gap-4 pt-2 mb-6">
                <Button
                  size="lg"
                  className="btn-primary px-8 gap-2 font-semibold text-lg py-3 transition-all duration-200 hover:scale-105"
                  onClick={handleSearch}
                  disabled={!selectedIdioma}
                >
                  <Search className="h-5 w-5" />
                  {selectedIdioma
                    ? "Buscar Cursos Virtuales"
                    : "Seleccione un idioma"}
                </Button>

                {hasFilters && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleClearFilters}
                    className="px-8 gap-2 font-semibold text-lg py-3 transition-all duration-200"
                  >
                    <RotateCcw className="h-5 w-5" />
                    Limpiar Filtros
                  </Button>
                )}
              </div>

              {hasFilters && (
                <div className="text-center mb-1 ">
                  <Badge variant="secondary">
                    Filtros activos virtuales:
                    {selectedIdioma && " Idioma"}
                  </Badge>
                </div>
              )}

              <CourseList
                filters={currentFilters}
                currentPersonData={currentPersonData}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
