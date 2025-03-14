This is the client application for the Titeenit 2025 pixel-based game. Players can claim pixels on a map to represent their guild.

## Overview

This project is a SvelteKit application that provides a visual interface for the Titeenit pixel game. Players can view the map, see guild territories, and claim pixels for their guild.

## Features

- Interactive pixel map built with PixiJS
- Guild-based pixel coloring system
- Pixel claiming functionality
- User authentication
- Real-time game state updates

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/) - Web framework
- [PixiJS](https://pixijs.com/) - WebGL rendering engine
- [pixi-viewport](https://github.com/davidfig/pixi-viewport) - Viewport navigation
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Protocol Buffers](https://protobuf.dev/) - Data serialization

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
bun install
```

3. Create a .env file based on .env.example:

```
PUBLIC_TITEENI_API=https://peli.titeen.it
PUBLIC_AUTHORIZATION_HEADER=JWT_TOKEN
```

### Development

Start the development server:

```bash
npm run dev
# or
bun run dev
```

To open the browser automatically:

```bash
npm run dev -- --open
```

### Building for Production

```bash
npm run build
# or
bun run build
```

Preview the production build:

```bash
npm run preview
```

## Game Mechanics

- Players belong to different guilds (Tietokilta, Algo, Cluster, etc.)
- Each guild has a specific color
- Players can claim pixels adjacent to their existing territory
- The map shows different pixel types (Normal, MapBorder, Spawn, FogOfWar)

## Project Structure

- game - Game components and logic
- client - API client functions
- components - Reusable UI components
- types - TypeScript type definitions
- utils - Utility functions
- routes - SvelteKit routes and API endpoints
- states - Global state management
- proto - Protocol Buffer definitions

## Contributing

Please follow the existing code style and conventions. Use Prettier for code formatting:

```bash
npm run format
```

Check for formatting issues:

```bash
npm run lint
```
