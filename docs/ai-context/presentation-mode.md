# Modo presentación

## Propósito

El modo presentación convierte una explicación en una secuencia guiada para
reuniones con clientes o equipos internos. No modifica el contenido técnico ni
la topología: solo controla el paso visible y la reproducción de la historia.

## Interacciones

- **Iniciar presentación** activa los atajos y conserva el paso actual.
- **Reproducir / Pausar** avanza automáticamente cada 6,5 segundos.
- **Reiniciar** vuelve al primer paso y deja la reproducción pausada.
- **Salir** desactiva la reproducción y los atajos.
- Cambiar de paso manualmente pausa la reproducción para permitir conversación.
- Al llegar al último paso, el autoplay se detiene solo.

## Teclado

Los atajos solo están activos dentro del modo presentación y no interfieren con
campos editables:

| Tecla | Acción |
| --- | --- |
| `ArrowRight` / `PageDown` | Siguiente paso |
| `ArrowLeft` / `PageUp` | Paso anterior |
| `Home` / `End` | Primer / último paso |
| `Space` | Reproducir o pausar |
| `Escape` | Salir del modo presentación |

## Reglas para futuras mejoras

1. El autoplay debe poder pausarse siempre; nunca debe impedir que el
   presentador converse o inspeccione un nodo.
2. El avance automático no debe cambiar el texto ni inventar estados técnicos:
   solo selecciona el siguiente `ExplainerStep`.
3. Cambiar de escena conserva las reglas existentes: selección de nodos,
   viewport y escenarios de fallo se reinician según sus contratos.
4. Si se añade una duración específica por tema, debe ser un dato de UX
   separado de las afirmaciones técnicas del contenido.
