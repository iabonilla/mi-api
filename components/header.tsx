// components/header.tsx - VERSIÓN COMPLETAMENTE CORREGIDA
import Image from "next/image";

export function Header() {
  return (
    <header className="border-b border-border bg-white shadow-sm">
      <div className="container-wide py-3"> {/* ✅ Cambiado a container-wide */}
        {/* Primera fila - Logos institucionales */}
        <div className="flex items-center justify-between mb-1">
          {/* Logo GRUN (izquierda) - PEGADO A LA IZQUIERDA */}
          <div className="flex-1 flex justify-start">
            <div className="w-70 h-13 rounded flex items-center justify-center overflow-hidden">
              <Image
                src="/Gobierno.png"
                alt="Gobierno de Nicaragua"
                width={280}
                height={80}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Logo SETEC (centro) - CENTRADO EXACTO */}
          <div className="flex-1 flex justify-center">
            <div className="flex flex-col items-center justify-center">
              <div className="w-70 h-auto rounded flex items-center justify-center overflow-hidden pt-5">
                <Image
                  src="/logo-setec.png"
                  alt="SETEC"
                  width={180}
                  height={60}
                  className="object-contain w-full h-auto"
                  style={{ width: 'auto', height: 'auto' }}
                  priority
                />
              </div>
              <div className="text-xs text-muted-foreground max-w-[200px] mt-1 text-center">
                Secretaría Técnica para Atención a las Universidades
              </div>
            </div>
          </div>

          {/* Logo Academia Brian Wilson (derecha) - PEGADO A LA DERECHA */}
          <div className="flex-1 flex justify-end">
            <div className="flex flex-col items-end justify-center text-right">
              <div className="text-sm text-muted-foreground">
                <h1 className="text-xl font-bold text-foreground leading-tight">
                  Academia de Idiomas<br />Héroe Brian Wilson
                </h1>              
              </div>
              <div className="mt-1">
                <p className="text-xs text-muted-foreground leading-tight">
                  Servicios en Línea<br />Prematrícula de Inglés 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}