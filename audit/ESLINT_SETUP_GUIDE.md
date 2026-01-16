# ESLint Setup Guide

## Current Status

ESLint is not fully configured in this project. The `lint` script exists in `package.json` but the necessary ESLint packages are not installed.

## Recommended Setup

### 1. Install Required Packages

```bash
npm install --save-dev eslint eslint-config-next @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### 2. Create `.eslintrc.json`

```json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": [
          {
            "group": ["../../*"],
            "message": "Use @/ alias for imports outside the current module. Relative imports like ../ui/ within the same module are allowed."
          }
        ]
      }
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ]
  }
}
```

### 3. Benefits

Once configured, ESLint will:
- Enforce the @/ alias pattern for cross-module imports
- Warn about explicit `any` types (helps with strict mode)
- Warn about unused variables (with exceptions for _ prefixed vars)
- Catch common React and Next.js issues

### 4. Usage

After setup, run:
```bash
npm run lint
```

To auto-fix issues:
```bash
npm run lint -- --fix
```

## Alternative: Prettier for Import Sorting

If you want to enforce import ordering without full ESLint setup:

### Install Prettier

```bash
npm install --save-dev prettier @trivago/prettier-plugin-sort-imports
```

### Create `.prettierrc.json`

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "plugins": ["@trivago/prettier-plugin-sort-imports"],
  "importOrder": [
    "^react",
    "^next",
    "^@/",
    "^[./]"
  ],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true
}
```

### Add Script to package.json

```json
{
  "scripts": {
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\""
  }
}
```

## Current Import Patterns (Good)

The codebase already follows good patterns:
- ✅ Using `@/` alias for cross-module imports
- ✅ Using relative imports (`../ui/`) within the same module
- ✅ No deep relative imports (`../../..`)

The ESLint/Prettier setup would just enforce these patterns going forward.
