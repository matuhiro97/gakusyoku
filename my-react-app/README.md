# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Environment Variables

Copy `.env.example` to `.env` in this directory and set the base URL for the backend API:

```
VITE_API_BASE_URL=https://gakusyokubackend.onrender.com
```

Replace the value with the actual base URL of your API. The application reads this value when requesting recommendations.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
