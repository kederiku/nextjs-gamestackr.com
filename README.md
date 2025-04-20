# Gamestackr

Frontend application for browsing and filtering game-related content, powered by Payload CMS.

## Features

*   Browse content by categories (Manufacturers, Platforms).
*   Dynamic category and subcategory navigation (dropdowns, sidebar).
*   Filtering capabilities (implementation details TBD).
*   Built with Next.js for server-side rendering and static generation capabilities.

## Technology Stack

*   **Frontend:** Next.js, React, TypeScript
*   **Styling:** Tailwind CSS, shadcn/ui (inferred from component structure)
*   **Backend:** Payload CMS (Requires a separate running instance)
*   **Database:** PostgreSQL (as configured in `payload.config.ts`)

## Getting Started

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn
*   Git
*   A running instance of the corresponding Payload CMS backend.
*   A PostgreSQL database instance.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd gamestackr
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    bun install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project. You can usually copy an example file if one exists (`cp .env.example .env`). Add the following essential variables:

    ```plaintext
    # Payload CMS connection
    DATABASE_URI=postgresql://user:password@host:port/database # Your PostgreSQL connection string
    PAYLOAD_SECRET=your-strong-payload-secret # A long, random string for security

    # URL of your running Payload backend (for frontend fetching)
    NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000 # Or your deployed backend URL
    ```
    *   Replace the values with your actual database credentials and Payload secret.
    *   Ensure `NEXT_PUBLIC_PAYLOAD_URL` points to where your Payload backend is running.

### Running the Development Server

1.  **Ensure the Payload CMS backend is running.**
2.  **Start the Next.js frontend:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    bun dev
    ```
3.  Open [http://localhost:3000](http://localhost:3000) (or the specified port) in your browser.

## Payload CMS Backend

This frontend application requires a compatible Payload CMS backend to function. The backend provides the data (Manufacturers, Platforms, Media, Users) via its API.

*   Make sure the backend is running and accessible at the URL specified in `NEXT_PUBLIC_PAYLOAD_URL`.
*   The collections expected by this frontend include `manufacturers`, `platforms`, `media`, and `users`. Ensure these are defined in your Payload configuration.
*   Refer to the [Payload CMS Documentation](https://payloadcms.com/docs) for more information on setting up and configuring Payload.

## Available Scripts

In the project directory, you can run the following commands:

*   `npm run dev` / `yarn dev` / `bun dev`
    Runs the app in development mode.
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

*   `npm run build` / `yarn build` / `bun build`
    Builds the app for production to the `.next` folder.

*   `npm run start` / `yarn start` / `bun start`
    Starts the production build.

*   `npm run lint` / `yarn lint` / `bun lint`
    Runs the linter (ESLint) to check code quality.

*   `npm run generate:types` / `yarn generate:types` / `bun generate:types`
    Generates TypeScript types based on your Payload CMS configuration.

*   `npm run db:fresh` / `yarn db:fresh` / `bun db:fresh`
    Drops the database and runs all migrations (Payload command).
    **Warning:** This is destructive and will delete all data.

*   `npm run db:seed` / `yarn db:seed` / `bun db:seed`
    Runs the database seed script (`src/seed.ts`).
    Assumes `bun` is installed for this specific script as defined.

## (Optional) Contributing

Information on how to contribute (e.g., reporting bugs, submitting pull requests) can be added here.

## (Optional) License

Specify the project's license here (e.g., MIT License).
