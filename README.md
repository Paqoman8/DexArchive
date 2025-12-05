# DexArchive

DexArchive is a modern, web-based Pokedex application built with Next.js and Tailwind CSS. It allows users to browse, search, and view detailed information about Pokemon using the [PokeAPI](https://pokeapi.co/).

## Features

-   **Pokedex Browser**: Browse a comprehensive list of Pokemon.
-   **Detailed Views**: View detailed statistics, abilities, and types for each Pokemon.
-   **Responsive Design**: Optimized for both desktop and mobile devices.
-   **Modern UI**: Built with a clean and modern interface using Tailwind CSS.
-   **Efficient Data Fetching**: Utilizes Axios for optimized API interactions.

## Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **HTTP Client**: [Axios](https://axios-http.com/)
-   **API**: [PokeAPI](https://pokeapi.co/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Ensure you have the following installed:
-   [Node.js](https://nodejs.org/) (v18 or higher recommended)
-   npm, yarn, pnpm, or bun

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Paqoman8/DexArchive.git
    cd dexarchive
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

4.  **Open the application:**

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project follows a standard Next.js App Router structure:

-   `app/`: Contains the application routes and pages.
    -   `(public)/`: Publicly accessible routes.
    -   `layout.tsx`: Main application layout.
-   `components/`: Reusable UI components.
    -   `layout/`: Layout components like Header, Sidebar, Footer.
    -   `pokedex/`: Components specific to the Pokedex feature.
-   `services/`: Service layer for API integration.
    -   `pokeapi/`: PokeAPI integration logic.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
