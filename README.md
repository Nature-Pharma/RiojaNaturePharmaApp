# RiojaNaturePharmaApp

Sistema de gestión interno para **Nature-Pharma**. Aplicación web frontend desarrollada con Angular 19 y Angular Material 21 (M3).

## Tecnologías

- **Angular 19** — Standalone components, signals, lazy loading
- **Angular Material 21** — M3 theme, paleta verde/blanco corporativa
- **TypeScript 5.x**
- **SCSS** — Variables, mixins responsive, tema personalizado

## Módulos

| Módulo | Ruta | Acceso |
|---|---|---|
| Dashboard | `/dashboard` | Todos los usuarios autenticados |
| Fabricación | `/fabricacion` | Dept. Fabricación + Admin |
| Logística | `/logistica` | Dept. Logística + Admin |
| RRHH | `/rrhh` | Dept. RRHH + Admin |
| Mantenimiento | `/mantenimiento` | Dept. Mantenimiento + Admin |

## Usuarios de prueba (mock)

| Usuario | Contraseña | Departamento | Rol |
|---|---|---|---|
| `admin` | `admin123` | Dirección | Admin (acceso total) |
| `fabricacion` | `fab123` | Fabricación | User |
| `logistica` | `log123` | Logística | User |
| `rrhh` | `rrhh123` | RRHH | User |
| `mantenimiento` | `mant123` | Mantenimiento | User |

## Instalación

```bash
npm install
ng serve
```

La aplicación estará disponible en `http://localhost:4200`.

## Arquitectura

- **Feature-based** — cada módulo tiene sus propios componentes, servicios y modelos
- **Standalone components** — sin NgModules
- **Lazy loading** — cada feature se carga bajo demanda
- **Signals** — gestión de estado reactiva sin NgRx
- **SOLID** — Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion

## Responsive

| Pantalla | Comportamiento del sidenav |
|---|---|
| Móvil (< 600px) | Oculto por defecto, overlay con botón hamburguesa |
| Tablet (600-959px) | Colapsado (solo iconos) |
| Desktop (960-1919px) | Expandido en modo side |
| TV (≥ 1920px) | Expandido, contenido centrado con max-width |
