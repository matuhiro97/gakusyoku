# Gakusyoku

Gakusyoku is a simple meal recommendation tool built with React and Vite.

The backend API can be found at [gakusyoku-backend](https://github.com/matuhiro97/gakusyoku-backend).

## Environment Variables

Create a `.env` file inside `my-react-app` with the following variable:

```

VITE_API_BASE_URL=https://gakusyokubackend.onrender.com

```

This value is used by the frontend to call the backend API.

## Setup

Install dependencies for the frontend:

```bash
cd my-react-app
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

## Build & Deploy

Create the production build:

```bash
npm run build
```

Deploy to GitHub Pages:

```bash
npm run deploy
```

