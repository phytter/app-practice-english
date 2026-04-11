# Practice English App - Gemini Context

## Project Overview

**Practice English App** is a Next.js 15 frontend application designed to help users practice English through movie dialogues. It features interactive audio recording, pronunciation comparison, and progress tracking.

The application follows **Clean Architecture** principles, ensuring a separation of concerns between the user interface, business logic, and external dependencies.

### Key Technologies

*   **Framework:** Next.js 15 (App Router)
*   **Language:** TypeScript (Strict mode)
*   **Styling:** Tailwind CSS 4, Radix UI, Framer Motion
*   **Authentication:** NextAuth.js (Google Provider)
*   **State Management:** React Query (@tanstack/react-query)
*   **HTTP Client:** Axios
*   **Audio:** WaveSurfer.js

## Architecture & Directory Structure

The project implements a strict separation of concerns:

*   **`src/domain/`**: **(Pure)** Contains business models and interfaces (`User`, `Movie`, `Dialogue`). No external dependencies.
*   **`src/data/`**: **(Application Logic)** Implements use cases and business rules. Contains Service classes (`AuthService`, `DialogueService`) that implement domain interfaces. Depends on abstract protocols (e.g., `HttpClient`).
*   **`src/infra/`**: **(Adapters)** Implementations of external protocols. Example: `AxiosHttpClient` implements `HttpClient`.
*   **`src/main/`**: **(Composition Root)** Handles dependency injection.
    *   `factories/`: Creates instances of services and controllers, injecting dependencies.
    *   `decorators/`: Adds behavior like authorization headers (`AuthorizeHttpClientDecorator`).
*   **`src/app/`**: **(Presentation)** Next.js App Router pages and layouts.
    *   `auth/`: Authentication pages.
    *   `panel/`: Protected application routes (practice, profile, admin).
    *   `api/`: Backend API proxies (NextAuth).
*   **`src/components/`**: **(UI)** Reusable React components.
    *   `ui/`: Generic UI primitives (Buttons, Inputs, Dialogs) often built on Radix UI.
    *   `providers/`: Context providers (Theme, Auth, Query).

## Development Workflow

### Setup & Run

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Variables:**
    Create a `.env` file based on `.env.example`:
    ```
    NEXT_PUBLIC_API_URL=...
    NEXTAUTH_SECRET=...
    NEXTAUTH_URL=http://localhost:3000
    GOOGLE_CLIENT_ID=...
    GOOGLE_CLIENT_SECRET=...
    ```

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Access at `http://localhost:3000`.

### Build & Test

*   **Build:** `npm run build`
*   **Start Production:** `npm start`
*   **Lint:** `npm run lint`

## Conventions & Patterns

*   **Dependency Injection:** Do not instantiate services directly in components. Use the factories in `src/main/factories`.
*   **Path Aliases:** Use `@/` to refer to `src/`.
*   **Authentication:**
    *   Routes under `/panel` are protected by `src/middleware.ts`.
    *   HTTP requests to the backend API are automatically intercepted by `AuthorizeHttpClientDecorator` to inject the JWT token.
*   **UI Components:** Build new UI elements in `src/components/ui` using Radix UI primitives where possible. Use `cn()` (from `lib/utils.ts`) for class merging.
*   **Data Fetching:** Use React Query custom hooks (in `src/hooks` or directly in components using service factories) for data fetching to handle caching and loading states.

## Related Resources

*   **Backend:** `api-practice-english` (External Repo)
*   **Infrastructure:** `infrastructure-practice-english` (External Repo)
