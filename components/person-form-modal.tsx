// components/person-form-modal.tsx - VERSIÓN CON EDICIÓN
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  User,
  Loader2,
  Key,
  MailCheck,
  Edit,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PersonFormStandalone } from "@/components/person-form-standalone";
import { EditPersonFormStandalone } from "@/components/edit-person-form-standalone";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { personService } from "@/services/person.service";
import type { PersonFormValues } from "@/types/course";

interface PersonFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPersonLoaded?: (personData: any) => void;
}

export function PersonFormModal({
  open,
  onOpenChange,
  onPersonLoaded,
}: PersonFormModalProps) {
  const [activeTab, setActiveTab] = useState("existing");
  const [personCode, setPersonCode] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [personData, setPersonData] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const { toast } = useToast();

  // Para estudiantes existentes - Buscar por código + email
  const handleSearchExistingPerson = async () => {
    if (!personCode.trim() && !userEmail.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingrese código de persona o email",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      let foundPerson;

      // Buscar por código de persona
      if (personCode) {
        foundPerson = await personService.getByCodigo(personCode);
      }
      // Buscar por email si no se encontró por código
      else if (userEmail) {
        foundPerson = await personService.getByEmail(userEmail);
      }

      if (foundPerson) {
        setPersonData(foundPerson);
        
        // ✅ NUEVO: Mostrar opciones en lugar de cargar directamente
        // El usuario decide si editar o continuar
        setShowEditForm(true);

        toast({
          title: "¡Persona encontrada!",
          description: "Puede editar los datos o continuar directamente",
        });

      } else {
        toast({
          title: "No encontrado",
          description: "No se encontró ninguna persona con esos datos",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error buscando persona:", error);
      toast({
        title: "Error",
        description: "Error al buscar la persona. Intente nuevamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Para nuevos estudiantes - Ir al formulario de registro
  const handleNewRegistration = () => {
    setShowForm(true);
    setActiveTab("new");
  };

  // ✅ CORREGIDO: El modal solo notifica al padre cuando el formulario tiene éxito
  const handleFormSuccess = (formData: any) => {
    console.log("✅ Formulario completado exitosamente:", formData);
    
    // Formatear datos para el componente padre
    const newPersonData = {
      id: formData.id,
      codigo: formData.codigo_persona,
      cedula: formData.numero_cedula,
      nombre: formData.nombres,
      apellido: formData.apellidos,
      email: formData.email,
      telefono: formData.telefono_movil,
      direccion: formData.direccion_completa,
      departamento: formData.departamento_id,
      municipio: formData.municipio_id,
      estado: "Activo"
    };

    setPersonData(newPersonData);
    setShowForm(false);

    // Notificar al padre con los datos formateados
    if (onPersonLoaded) {
      onPersonLoaded(newPersonData);
    }

    toast({
      title: "¡Registro exitoso!",
      description: `Persona registrada correctamente. Código: ${formData.codigo_persona}`,
    });

    // Cerrar modal después de éxito
    setTimeout(() => {
      onOpenChange(false);
    }, 2000);
  };

  // ✅ NUEVO: Manejar guardado y continuación desde edición
  const handleSaveAndContinue = (formData: PersonFormValues) => {
    console.log("💾 Guardar y continuar:", formData);
    
    // Formatear datos para el componente padre
    const updatedPersonData = {
      id: personData.id,
      codigo: formData.codigo_persona,
      cedula: formData.numero_cedula,
      nombre: formData.nombres,
      apellido: formData.apellidos,
      email: formData.email,
      telefono: formData.telefono_movil,
      direccion: formData.direccion_completa,
      departamento: formData.departamento_id,
      municipio: formData.municipio_id,
      estado: "Activo"
    };

    setPersonData(updatedPersonData);
    setShowEditForm(false);

    // Notificar al padre con los datos actualizados
    if (onPersonLoaded) {
      onPersonLoaded(updatedPersonData);
    }

    toast({
      title: "¡Datos actualizados!",
      description: "La información se guardó correctamente",
    });

    // Cerrar modal después de éxito
    setTimeout(() => {
      onOpenChange(false);
    }, 1500);
  };

  // ✅ NUEVO: Manejar continuación sin guardar desde edición
  const handleContinueOnly = (formData: PersonFormValues) => {
    console.log("🚀 Continuar sin guardar:", formData);
    
    // Formatear datos para el componente padre
    const personDataToLoad = {
      id: personData.id,
      codigo: formData.codigo_persona,
      cedula: formData.numero_cedula,
      nombre: formData.nombres,
      apellido: formData.apellidos,
      email: formData.email,
      telefono: formData.telefono_movil,
      direccion: formData.direccion_completa,
      departamento: formData.departamento_id,
      municipio: formData.municipio_id,
      estado: "Activo"
    };

    setShowEditForm(false);

    // Notificar al padre con los datos (pueden tener cambios no guardados)
    if (onPersonLoaded) {
      onPersonLoaded(personDataToLoad);
    }

    toast({
      title: "¡Bienvenido!",
      description: "Sus datos han sido cargados correctamente",
    });

    // Cerrar modal después de éxito
    setTimeout(() => {
      onOpenChange(false);
    }, 1500);
  };

  // ✅ NUEVO: Volver a la búsqueda desde edición
  const handleBackToSearch = () => {
    setShowEditForm(false);
    setPersonData(null);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Resetear estado al cerrar después de un delay
    setTimeout(() => {
      setPersonCode("");
      setUserEmail("");
      setPersonData(null);
      setShowForm(false);
      setShowEditForm(false);
      setActiveTab("existing");
    }, 300);
  };

  const handleNewSearch = () => {
    setPersonData(null);
    setPersonCode("");
    setUserEmail("");
    setShowForm(false);
    setShowEditForm(false);
    setActiveTab("existing");
  };

  // ✅ NUEVO: Convertir datos de persona a PersonFormValues
  const convertToFormValues = (person: any): PersonFormValues => {
    return {
      id: person.id,
      codigo_persona: person.codigo_persona,
      nombres: person.nombres,
      apellidos: person.apellidos,
      fecha_nacimiento: person.fecha_nacimiento,
      numero_cedula: person.numero_cedula,
      nacionalidad: person.nacionalidad,
      genero: person.genero,
      email: person.email,
      telefono_movil: person.telefono_movil,
      telefono_alterno: person.telefono_alterno,
      direccion_completa: person.direccion_completa,
      municipio_id: person.municipio_id,
      departamento_id: person.departamento_id,
      nivel_academico: person.nivel_academico,
      idioma_interes_id: person.idioma_interes_id,
      preferencia_horario: person.preferencia_horario,
      contacto_emergencia_nombre: person.contacto_emergencia_nombre,
      contacto_emergencia_relacion: person.contacto_emergencia_relacion,
      contacto_emergencia_telefono: person.contacto_emergencia_telefono,
      estado: person.estado
    };
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="overflow-auto"
        style={{
          width: "100vw",
          height: "85vh",
          maxWidth: "1500px",
          maxHeight: "1500px",
        }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {showForm ? "Registro de Nueva Persona" : 
             showEditForm ? "Editar Datos de Persona" : "Acceso al Sistema"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* ✅ NUEVO: Mostrar formulario de edición para estudiantes existentes */}
          {showEditForm && personData ? (
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-4">
                  <h3 className="font-semibold mb-4 text-blue-800">
                    <Edit className="h-5 w-5 inline mr-2" />
                    Edite sus datos si es necesario
                  </h3>
                  <EditPersonFormStandalone
                    personData={convertToFormValues(personData)}
                    onSaveAndContinue={handleSaveAndContinue}
                    onContinueOnly={handleContinueOnly}
                    onCancel={handleBackToSearch}
                  />
                </CardContent>
              </Card>
            </div>
          ) : showForm ? (
            /* Formulario de registro para nuevos estudiantes */
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-4">
                  <h3 className="font-semibold mb-4 text-green-800">
                    Complete sus datos para registrarse como nuevo estudiante
                  </h3>
                  <PersonFormStandalone
                    onSuccess={handleFormSuccess}
                    loading={loading}
                  />
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={handleNewSearch}
                  disabled={loading}
                >
                  Volver al acceso
                </Button>
              </div>
            </div>
          ) : (
            /* Tabs para elegir entre estudiante existente o nuevo */
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="existing">
                  <User className="h-4 w-4 mr-2" />
                  Estudiante Existente
                </TabsTrigger>
                <TabsTrigger value="new">
                  <MailCheck className="h-4 w-4 mr-2" />
                  Nuevo Estudiante
                </TabsTrigger>
              </TabsList>

              {/* Tab para estudiantes existentes */}
              <TabsContent value="existing" className="space-y-4">
                <Card>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className="text-center mb-4">
                        <Key className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                        <h3 className="font-semibold text-blue-800">
                          Acceso con Credenciales
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Ingrese su código de persona o email para acceder
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium mb-1 block">
                            Código de Persona
                          </label>
                          <Input
                            placeholder="Su código de persona"
                            value={personCode}
                            onChange={(e) => setPersonCode(e.target.value)}
                          />
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                          O
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-1 block">
                            Correo Electrónico
                          </label>
                          <Input
                            type="email"
                            placeholder="su.correo@ejemplo.com"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <Button
                        onClick={handleSearchExistingPerson}
                        disabled={loading || (!personCode && !userEmail)}
                        className="w-full mt-4"
                      >
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <Search className="h-4 w-4 mr-2" />
                        )}
                        {loading ? "Buscando..." : "Buscar Persona"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab para nuevos estudiantes */}
              <TabsContent value="new" className="space-y-4">
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="pt-4">
                    <div className="text-center space-y-4">
                      <MailCheck className="h-12 w-12 text-green-600 mx-auto" />
                      <div>
                        <h3 className="font-semibold text-green-800">
                          Registro de Nuevo Estudiante
                        </h3>
                        <p className="text-sm text-green-600 mt-2">
                          Complete el formulario de registro para crear su
                          cuenta de estudiante
                        </p>
                      </div>

                      <div className="text-left text-sm text-green-700 space-y-2 bg-green-100 p-3 rounded">
                        <p>
                          <strong>Proceso de registro:</strong>
                        </p>
                        <p>
                          1. Complete el formulario con sus datos personales
                        </p>
                        <p>
                          2. Se generará automáticamente su código de persona
                        </p>
                        <p>
                          3. Use su código o email para acceder en el futuro
                        </p>
                      </div>

                      <Button
                        onClick={handleNewRegistration}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Comenzar Registro
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}