# React + TypeScript + Vite


#### [Live](https://cra-app-ten.vercel.app/) click for live demo


### Using this packages

  -  "@reduxjs/toolkit": "^2.13.0",
  -  "@tailwindcss/vite": "^4.3.3",
  -  "react": "^19.3.1",
  -  "react-dom": "^19.3.1",
  -  "react-redux": "^9.3.1",
  -  "react-router": "^8.5.1",
  -  "tailwindcss": "^4.3.3"


This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

#### OLD Version  [Live](https://cra-app.netlify.app/) click for live demo 
