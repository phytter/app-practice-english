# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the Application
```bash
npm run dev
# or
yarn dev
```
The application will be available at `http://localhost:3000`. Uses Turbopack for faster development builds.

### Building for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

### Installing Dependencies
```bash
npm install
# or
yarn install
```

## Architecture Overview

This is a Next.js 15 frontend application for practicing English through movie dialogues. It implements Clean Architecture principles with clear separation of concerns and dependency injection patterns.

### Project Structure

**App Router** (`src/app/`):
- Uses Next.js 15 App Router with TypeScript
- Authentication pages in `src/app/auth/`
- Protected routes in `src/app/panel/` (practice, profile, admin)
- API routes for NextAuth.js in `src/app/api/auth/`

**Domain Layer** (`src/domain/`):
- Pure business models and entities
- [`DialogueModel`](src/domain/models/dialogue-model.ts:10), [`UserModel`](src/domain/models/user-model.ts:17), [`MovieModel`](src/domain/models/movie-model.ts) interfaces
- No external dependencies, framework-agnostic

**Data Layer** (`src/data/`):
- Service classes implementing business logic
- HTTP protocol abstractions in [`src/data/protocols/http/`](src/data/protocols/http/)
- Services: [`AuthService`](src/data/services/auth-service.ts:4), [`DialogueService`](src/data/services/dialogue-service.ts:10), [`MovieService`](src/data/services/movie-service.ts), [`UserService`](src/data/services/user-service.ts)

**Infrastructure Layer** (`src/infra/`):
- External dependencies implementations
- [`AxiosHttpClient`](src/infra/http/axios-http-client.ts:4) implementing [`HttpClient`](src/data/protocols/http/http-client.ts:11) interface

**Main Layer** (`src/main/`):
- Dependency injection and factory patterns
- Factories in [`src/main/factories/`](src/main/factories/) for services and HTTP clients
- [`AuthorizeHttpClientDecorator`](src/main/decorators/authorise-http-client-decorator.ts:6) for JWT token injection

**Components** (`src/components/`):
- Reusable UI components using Radix UI and Tailwind CSS
- Provider components for authentication, themes, and React Query
- Layout components and custom UI elements

### Key Technologies

- **Next.js 15**: React framework with App Router and Turbopack
- **TypeScript**: Type safety with strict configuration
- **Tailwind CSS 4**: Utility-first CSS framework
- **NextAuth.js**: Authentication with Google OAuth
- **React Query (@tanstack/react-query)**: Server state management
- **Framer Motion**: Animations and transitions
- **Radix UI**: Accessible component primitives
- **WaveSurfer.js**: Audio waveform visualization
- **Axios**: HTTP client for API communication

### Authentication System

**NextAuth.js Configuration**:
- Google OAuth provider setup in [`auth-options.ts`](src/app/api/auth/[...nextauth]/auth-options.ts:6)
- JWT strategy with custom session handling
- Access token management for API authentication

**Protected Routes**:
- All routes under [`/panel`](src/app/panel/) require authentication
- Automatic token injection via [`AuthorizeHttpClientDecorator`](src/main/decorators/authorise-http-client-decorator.ts:6)

### Design Patterns

**Clean Architecture**:
- Dependency inversion with interface abstractions
- Factory pattern for dependency injection
- Decorator pattern for HTTP client enhancement

**Service Layer Pattern**:
- Each domain has dedicated service classes
- Consistent HTTP request/response handling
- Centralized error management

**Factory Pattern**:
- Service factories in [`src/main/factories/services/`](src/main/factories/services/)
- HTTP client factories with authorization decoration

### Environment Configuration

Required environment variables (see [`.env.example`](.env.example:1)):
```bash
# Authentication
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# API
NEXT_PUBLIC_API_URL=your_backend_api_url
```

### Key Features Implementation

**Audio Recording & Processing**:
- Browser MediaRecorder API for audio capture
- WebM audio format for recordings
- WaveSurfer.js for audio visualization
- Audio practice evaluation via backend API

**Movie Dialogue Practice**:
- Dynamic routing: [`/panel/practice/movies/[imdbId]/dialogues/[id]`](src/app/panel/practice/movies/[imdbId]/dialogues/[id]/page.tsx:16)
- Real-time audio recording and playback
- Practice result feedback with scoring

**User Progress Tracking**:
- XP points and achievement system
- Practice history with detailed metrics
- Progress visualization components

### TypeScript Configuration

- **Strict mode enabled** with comprehensive type checking
- **Path mapping**: `@/*` resolves to `src/*`
- **Target**: ES2017 for modern browser support
- **Module resolution**: Bundler strategy for Next.js compatibility

### Styling System

**Tailwind CSS 4**:
- Custom component variants with `class-variance-authority`
- Dark/light theme support via `next-themes`
- PostCSS configuration for CSS processing

**Component Library**:
- Radix UI primitives for accessibility
- Custom components in [`src/components/ui/`](src/components/ui/)
- Consistent design system implementation

### State Management

**React Query**:
- Server state caching and synchronization
- Optimistic updates for practice submissions
- Query invalidation strategies

**React Hooks**:
- Custom hooks in [`src/hooks/`](src/hooks/) for reusable logic
- [`useDebounce`](src/hooks/use-debounce.ts) for search optimization

### API Integration

**HTTP Client Architecture**:
- Abstract [`HttpClient`](src/data/protocols/http/http-client.ts:11) interface
- [`AxiosHttpClient`](src/infra/http/axios-http-client.ts:4) implementation
- Automatic authorization header injection
- Consistent error handling and response typing

**Service Integration**:
- RESTful API communication with backend
- FormData support for file uploads (audio files)
- Standardized request/response patterns

### Testing Strategy

- ESLint configuration with Next.js and TypeScript rules
- Strict TypeScript checking for compile-time error detection
- Component-based testing approach recommended

### Development Guidelines

**File Organization**:
- Follow domain-driven folder structure
- Keep related files grouped by feature/domain
- Use index files for clean imports

**Code Style**:
- ESLint + Next.js TypeScript rules
- Consistent naming conventions
- Interface-driven development

**Component Development**:
- Prefer composition over inheritance
- Use TypeScript interfaces for props
- Implement proper error boundaries

### Related Projects

- **Backend API**: Provides dialogue data, user management, and audio processing
- **Infrastructure**: Deployment and infrastructure management

### Performance Considerations

- **Next.js 15** with Turbopack for fast development builds
- **React Query** for efficient data fetching and caching
- **Lazy loading** for route-based code splitting
- **Optimized images** with Next.js Image component

### Security Features

- **JWT token management** with automatic refresh
- **Environment variable protection** for sensitive data
- **CORS handling** via backend API configuration
- **Input validation** at component and service levels