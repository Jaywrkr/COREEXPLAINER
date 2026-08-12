# Lenguaje visual de diagramas

## Objetivo

Los diagramas deben explicar relaciones y límites, no solo decorar la escena.
El motor comparte una gramática visual para que un cliente pueda interpretar
un tema nuevo sin reaprender los símbolos.

## Relaciones

Cada `SceneEdge` declara un `kind`:

- `data`: camino por el que viajan solicitudes o resultados.
- `control`: administración, coordinación u orquestación.
- `storage`: persistencia o relación con el almacenamiento.
- `dependency`: dependencia conceptual que no debe leerse como un paquete.
- `failure`: relación usada para explicar impacto o propagación de una falla.

El storyboard debe decir si una flecha es conceptual. Una arista de dependencia
no debe presentarse como un recorrido de red real.

## Capas

La leyenda del canvas permite activar o desactivar capas de nodos:

- Gestión.
- Cómputo.
- Storage.
- Red.
- Cargas.
- Exterior.

Ocultar una capa es una ayuda de lectura; no cambia la simulación interna ni
afirma que el componente no exista en la arquitectura.

## Reglas para nuevas escenas

1. Elegir el mínimo de nodos que permita explicar la idea.
2. Declarar el significado de cada arista antes de dibujarla.
3. Usar la leyenda para descubrir relaciones, no como sustituto del texto.
4. Separar caminos de datos y de control aunque conecten los mismos nodos.
5. Usar un escenario o una anotación para explicar estados temporales; no
   sobrecargar la topología base con todos los estados posibles.
6. Validar la escena con `parseAnimationSpec()` y el control de contenido antes
   de publicar el tema.
