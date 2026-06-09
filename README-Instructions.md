[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/-AiMwjkH)
# Prueba Técnica — Full-Stack Developer

## Contexto

Queremos que construyas una pequeña aplicación web con autenticación social. No buscamos una app completa ni un diseño elaborado — lo que nos interesa es ver cómo integras servicios externos, cómo manejas la seguridad, y cómo escribes código en TypeScript.

## Qué tienes que construir

Una aplicación con las siguientes características:

**Backend (Node.js \+ TypeScript)**

- API REST con al menos un recurso protegido (lo que quieras: notas, bookmarks, tareas... no importa el dominio, elige lo que te sea más rápido).  
- Login social con al menos un provider OAuth (Google, GitHub, o el que prefieras).  
- La sesión debe ser persistente: el usuario no debe tener que volver a logarse cada vez que abre la app. Implementa el mecanismo que consideres adecuado para esto.

**Frontend (React \+ TypeScript)**

- Una vista de login con el botón de login social.  
- Una vista protegida que muestre el recurso que hayas elegido.  
- El estado de autenticación debe mantenerse al refrescar la página.

## Requisitos técnicos

- **TypeScript estricto**: `strict: true` en tsconfig. Queremos ver tipos reales, no `any`.  
- **Testing**: Al menos tests unitarios para la lógica de autenticación. Tests de integración son un plus, pero calidad sobre cantidad.  
- **Git**: Commits atómicos con mensajes descriptivos. Trabaja como lo harías en un proyecto real.

## Sobre el uso de IA

Puedes usar cualquier herramienta de IA que quieras (Copilot, Claude, Cursor, etc.). Si las usas, **no escondas los archivos de configuración** (CLAUDE.md, .cursorrules, o lo que uses). Queremos ver cómo trabajas con estas herramientas.

Si no usas IA, no pasa nada. Evaluamos tu código, no tus herramientas.

## Entrega

1. Trabaja directamente en este repositorio.  
2. Abre un **Pull Request** contra “main” cuando hayas terminado.  
3. En la descripción del PR, explica brevemente:  
   - Las decisiones técnicas que tomaste y por qué.  
   - Qué harías diferente con más tiempo.  
   - Cualquier cosa que quieras que sepamos antes de revisar.  
4. Incluye un README con instrucciones para levantar el entorno local. Si no podemos levantarlo en local siguiendo las instrucciones no tomaremos en cuenta la prueba.

## Plazo

Tienes **72 horas** desde que aceptas la invitación al repositorio. El tiempo estimado de trabajo es de 2-3 horas

## Qué sigue después

Si pasas esta fase, tendremos una sesión de 45 minutos donde te pediremos que nos expliques tu código y hagamos un pequeño cambio juntos en vivo.

---

**¿Dudas?** Si tienes preguntas sobre el enunciado, por favor abre un ***Issue*** en este mismo repositorio. Preferimos que preguntes a que hagas suposiciones incorrectas.  

## Setup & Local Development

This project uses `pnpm` as the package manager and is structured as a monorepo. It requires Docker and Docker Compose to be installed for local development.


