# iWatt.club 🔌⚡

**El club de la energía inteligente** - Dashboard y comunidad para optimización energética con Next.js, AWS IoT y modo DEMO intercambiable.

## 🚀 Características

- **Dashboard en tiempo real** con gráficos de consumo energético
- **Comunidad activa** con ranking, retos y tips colaborativos  
- **Modo DEMO** completo con datos sintéticos realistas
- **Arquitectura preparada para AWS** (AppSync + Cognito + Timestream)
- **Next.js 15** con App Router y TypeScript
- **UI moderna** con TailwindCSS y componentes reutilizables
- **Despliegue optimizado** para Vercel con ISR

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                             │
│  Next.js 15 + TypeScript + TailwindCSS + Recharts         │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                   Data Layer                                │
│  Adaptador intercambiable: Mock (DEMO) ↔ AWS (Real)       │
└─────────────────────────┬───────────────────────────────────┘
                          │
              ┌───────────▼──────────────┐
              │     DEMO Mode            │
              │   Datos sintéticos       │
              │   Tiempo real simulado   │
              └──────────────────────────┘
                          │
              ┌───────────▼──────────────┐
              │     AWS Mode             │
              │   AppSync GraphQL        │
              │   Cognito Auth           │
              │   Timestream DB          │
              │   IoT Core               │
              └──────────────────────────┘
```

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **TailwindCSS** - Estilos utilitarios
- **Recharts** - Gráficos interactivos
- **@headlessui/react** - Componentes accesibles

### GraphQL & Real-time
- **@urql/core** - Cliente GraphQL HTTP
- **graphql-ws** - Subscripciones WebSocket
- **@urql/exchange-graphcache** - Cache normalizado

### Auth (futuro)
- **amazon-cognito-identity-js** - Autenticación AWS
- **Cognito User Pool** - Gestión de usuarios
- **Cognito Hosted UI** - Interfaz de login

### AWS IoT Stack (futuro)
- **AWS IoT Core** - Ingesta de datos MQTT
- **AWS AppSync** - API GraphQL gestionada  
- **Amazon Timestream** - Base de datos temporal
- **AWS Lambda** - Procesamiento serverless

### DevOps
- **Vercel** - Despliegue y hosting
- **Husky** - Git hooks para calidad
- **Vitest** - Testing unitario
- **ESLint + Prettier** - Calidad de código

## 🚦 Modos de Operación

### 🎭 DEMO Mode (Actual)
```bash
NEXT_PUBLIC_DEMO=true
```
- Datos sintéticos realistas con patrones de consumo
- Actualizaciones en tiempo real simuladas (cada 3s)
- Comunidad ficticia con rankings y retos
- Perfecto para demos, desarrollo y testing

### 🏭 REAL Mode (Futuro)
```bash
NEXT_PUBLIC_DEMO=false  
NEXT_PUBLIC_APPSYNC_HTTP=https://xxx.appsync-api.region.amazonaws.com/graphql
NEXT_PUBLIC_COGNITO_USER_POOL_ID=region_xxxxxxxxx
```
- Conectado a AWS IoT + AppSync + Timestream
- Datos reales de dispositivos IoT  
- Autenticación con Cognito
- Subscripciones GraphQL en tiempo real

## 📦 Instalación y Desarrollo

### Prerrequisitos
- Node.js 20+ 
- npm o yarn
- Git

### Setup Local

1. **Clonar y entrar al proyecto**
```bash
git clone https://github.com/JordanBlancas/iwattclub.git
cd iwattclub/apps/web
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
# Editar .env.local si necesitas configuraciones específicas
```

4. **Iniciar desarrollo**
```bash
npm run dev
```

5. **Abrir en navegador**: http://localhost:3000

### Development con Codespaces

El proyecto incluye configuración completa para GitHub Codespaces:

1. Fork el repositorio
2. Crear Codespace desde GitHub
3. ¡Listo! El entorno se configura automáticamente

## 📊 Estructura del Proyecto

```
apps/web/
├── app/                          # Next.js App Router
│   ├── (public)/                # Rutas públicas 
│   │   ├── page.tsx             # Home con marketing + KPIs demo
│   │   ├── comunidad/page.tsx   # Ranking y logros comunitarios
│   │   ├── retos/page.tsx       # Desafíos mensuales
│   │   └── educacion/page.tsx   # Recursos y webinars
│   ├── dashboard/               # Dashboard privado
│   │   ├── page.tsx            # Vista principal con tiempo real
│   │   └── devices/[id]/page.tsx # Detalle de dispositivo
│   ├── api/health/route.ts      # Endpoint de salud
│   └── layout.tsx               # Layout principal
├── components/                   # Componentes reutilizables
│   ├── Layout.tsx               # Layout base
│   ├── Nav.tsx                  # Navegación principal
│   ├── Footer.tsx               # Footer con links
│   ├── KpiCard.tsx              # Tarjetas de métricas
│   ├── EnergyChart.tsx          # Gráficos con Recharts
│   └── DemoBadge.tsx            # Badge de modo demo
├── lib/                         # Lógica de negocio
│   ├── config.ts               # Configuración de la app
│   ├── featureFlags.ts         # Flags de funcionalidad
│   ├── data/                   # Capa de datos
│   │   ├── index.ts            # Selector de adaptador
│   │   ├── mock.ts             # Datos sintéticos (DEMO)
│   │   └── aws.ts              # Cliente AWS (Real)
│   ├── gql/                    # GraphQL
│   │   ├── client.ts           # Cliente urql + ws
│   │   └── queries.ts          # Queries y subscriptions
│   ├── auth/                   # Autenticación
│   │   └── cognito.ts          # Helpers de Cognito
│   └── utils/                  # Utilidades
│       └── format.ts           # Formateadores de datos
├── middleware.ts               # Middleware de Next.js
└── __tests__/                  # Tests unitarios
    └── format.test.ts
```

## 🎯 Funcionalidades Clave

### 🏠 Home Page
- Hero impactante con claim principal
- KPIs en tiempo real del consumo demo
- Gráfico de 24h con datos históricos
- CTA para unirse a la comunidad

### 📊 Dashboard 
- **Tiempo real**: Gráficos que actualizan cada 3s
- **KPIs principales**: Consumo, potencia, factor de potencia
- **Histórico**: Tendencias de las últimas 2 horas  
- **Dispositivos**: Lista con estado y última actividad
- **Alertas**: Notificaciones de eventos importantes

### 👥 Comunidad
- **Ranking mensual** de ahorro energético
- **Logros colectivos** con barras de progreso
- **Tips compartidos** por la comunidad
- **Estadísticas globales** de impacto

### 🎯 Retos
- **Desafíos activos** con progreso individual
- **Próximos retos** para mantener engagement  
- **Historial de logros** con puntos ganados
- **Sistema de gamificación** con recompensas

### 📚 Educación
- **Artículos técnicos** categorizados por dificultad
- **Webinars en vivo** con expertos del sector
- **Recursos descargables** y guías prácticas
- **Filtros avanzados** por categoría y nivel

## 🚀 Despliegue en Vercel

### Despliegue Automático

1. **Fork** este repositorio
2. Conecta tu cuenta de **Vercel** con GitHub  
3. **Import Project** desde Vercel dashboard
4. Configura las **variables de entorno** en Vercel:

```bash
# Obligatorias
NEXT_PUBLIC_DEMO=true

# Opcionales para modo Real (futuro)
NEXT_PUBLIC_APPSYNC_HTTP=https://xxx.appsync-api.region.amazonaws.com/graphql
NEXT_PUBLIC_APPSYNC_WSS=wss://xxx.appsync-realtime-api.region.amazonaws.com/graphql
NEXT_PUBLIC_COGNITO_USER_POOL_ID=region_xxxxxxxxx
NEXT_PUBLIC_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_COGNITO_REGION=us-east-1
```

5. **Deploy** - Vercel detectará automáticamente Next.js

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción  
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint
npm run type-check   # Verificación de tipos
npm run test         # Tests unitarios
npm run test:watch   # Tests en modo watch
```

## 🗺️ Roadmap de Conexión AWS

### Fase 1: Infraestructura (infra/terraform/)
- [ ] **AWS IoT Core** - Topic y reglas para dispositivos
- [ ] **Amazon Timestream** - Base de datos temporal
- [ ] **AWS AppSync** - API GraphQL con resolvers
- [ ] **Amazon Cognito** - User Pool y App Client
- [ ] **AWS Lambda** - Funciones de procesamiento

### Fase 2: Backend Integration
- [ ] Implementar `lib/data/aws.ts` con clientes reales
- [ ] Queries GraphQL para AppSync
- [ ] Subscripciones WebSocket para tiempo real
- [ ] Manejo de autenticación con Cognito
- [ ] Pipeline CI/CD con AWS CodePipeline

### Fase 3: Dispositivos IoT
- [ ] SDK para dispositivos ESP32/Arduino
- [ ] Protocolo MQTT para envío de datos
- [ ] Certificados y seguridad de dispositivos
- [ ] Dashboard de gestión de dispositivos

### Fase 4: Analytics Avanzado
- [ ] Amazon QuickSight para reportes
- [ ] AWS Kinesis para streaming de datos
- [ ] Machine Learning con Amazon SageMaker
- [ ] Predicciones de consumo energético

## 🤝 Contribución

1. Fork del proyecto
2. Crear feature branch: `git checkout -b feature/amazing-feature`
3. Commit cambios: `git commit -m 'Add amazing feature'`
4. Push a branch: `git push origin feature/amazing-feature`  
5. Abrir Pull Request

### Convenciones
- **Commits**: Conventional Commits (`feat:`, `fix:`, `docs:`)
- **Código**: ESLint + Prettier (automático con husky)
- **TypeScript**: Strict mode habilitado
- **Tests**: Obligatorios para nuevas features

## 📄 Licencia

Este proyecto está licenciado bajo la **MIT License**.

## 🙏 Agradecimientos

- **Next.js team** por el excelente framework
- **Tailwind CSS** por el sistema de diseño
- **Recharts** por los gráficos interactivos  
- **AWS** por la infraestructura cloud
- **Vercel** por la plataforma de despliegue

---

**¿Listo para unirte al club de la energía inteligente?** 🔌⚡

Deployed with ❤️ on [Vercel](https://vercel.com)# Deploy Clean Branch - Mon Sep 15 07:05:52 PM UTC 2025
