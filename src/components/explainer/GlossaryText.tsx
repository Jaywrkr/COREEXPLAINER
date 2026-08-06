interface GlossaryEntry {
  term: string;
  explanation: string;
}

/** Small, plain-language definitions for recurring terms in the explainers. */
export const GLOSSARY_ENTRIES: GlossaryEntry[] = [
  { term: "VCF", explanation: "VMware Cloud Foundation: conjunto integrado para operar una nube privada." },
  { term: "VM", explanation: "máquina virtual: un ordenador simulado por software." },
  { term: "vSAN", explanation: "almacenamiento distribuido que combina discos de varios hosts." },
  { term: "NSX", explanation: "capa de red y seguridad definida por software." },
  { term: "ESXi", explanation: "hipervisor que ejecuta máquinas virtuales en un servidor físico." },
  { term: "vCenter", explanation: "consola y servicio central para administrar vSphere." },
  { term: "HA", explanation: "alta disponibilidad: recuperación automática o coordinada ante una falla." },
  { term: "DR", explanation: "recuperación ante desastres: volver a operar después de un incidente mayor." },
  { term: "RPO", explanation: "cuánta información se acepta perder, medida como tiempo." },
  { term: "RTO", explanation: "cuánto tiempo puede tardar la recuperación del servicio." },
  { term: "SAN", explanation: "red dedicada para conectar servidores con almacenamiento." },
  { term: "NAS", explanation: "almacenamiento de archivos accesible por la red." },
  { term: "LAN", explanation: "red local que conecta equipos dentro de una sede o entorno." },
  { term: "VLAN", explanation: "segmento lógico que separa tráfico dentro de una red física." },
  { term: "MTU", explanation: "tamaño máximo de un paquete que puede viajar por un enlace." },
  { term: "DNS", explanation: "servicio que traduce nombres, como un dominio, a direcciones IP." },
  { term: "NTP", explanation: "servicio que mantiene sincronizados los relojes de los equipos." },
  { term: "API", explanation: "interfaz que permite que dos sistemas intercambien solicitudes y respuestas." },
  { term: "SLA", explanation: "acuerdo de nivel de servicio entre proveedor y cliente." },
  { term: "SLO", explanation: "objetivo medible de nivel de servicio, como disponibilidad o latencia." },
  { term: "APM", explanation: "monitorización del rendimiento y comportamiento de aplicaciones." },
  { term: "OTLP", explanation: "protocolo usado para enviar señales de observabilidad." },
  { term: "HCL", explanation: "lista de compatibilidad validada entre hardware, software y versión." },
  { term: "LUN", explanation: "volumen lógico de almacenamiento presentado a un servidor." },
  { term: "HBA", explanation: "adaptador del servidor para conectarse a una red de almacenamiento." },
  { term: "VIP", explanation: "dirección virtual que representa un servicio o un grupo de equipos." },
  { term: "LAG", explanation: "agrupación de enlaces para sumar capacidad o resiliencia." },
  { term: "I/O", explanation: "entrada y salida de datos entre un sistema y sus dispositivos." },
  { term: "rps", explanation: "solicitudes o eventos por segundo en la animación conceptual." },
  { term: "failover", explanation: "cambio controlado hacia un componente o sitio alternativo." },
  { term: "runbook", explanation: "guía operativa con pasos, responsables y criterios de decisión." },
  { term: "workload", explanation: "carga de trabajo: aplicación, máquina virtual o servicio que consume recursos." },
  { term: "storage", explanation: "capa de almacenamiento donde se guardan datos persistentes." },
  { term: "control plane", explanation: "componentes que coordinan y administran el funcionamiento del sistema." },
  { term: "data plane", explanation: "camino que transporta el tráfico o los datos del servicio." },
];

const glossaryByTerm = new Map(GLOSSARY_ENTRIES.map((entry) => [entry.term.toLowerCase(), entry.explanation]));
const glossaryPattern = new RegExp(`\\b(${GLOSSARY_ENTRIES.map((entry) => entry.term.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")).sort((a, b) => b.length - a.length).join("|")})\\b`, "g");

interface GlossaryTextProps {
  text: string;
  className?: string;
}

/** Annotates known terms without changing the authored copy or adding paragraphs. */
export function GlossaryText({ text, className }: GlossaryTextProps) {
  const parts = text.split(glossaryPattern);
  return (
    <span className={className}>
      {parts.map((part, index) => {
        const explanation = glossaryByTerm.get(part.toLowerCase());
        if (!explanation) return <span key={`${part}-${index}`}>{part}</span>;
        return (
          <abbr
            key={`${part}-${index}`}
            title={explanation}
            tabIndex={0}
            aria-label={`${part}: ${explanation}`}
            className="cursor-help border-b border-dotted border-core-accent/60 no-underline"
          >
            {part}
          </abbr>
        );
      })}
    </span>
  );
}
