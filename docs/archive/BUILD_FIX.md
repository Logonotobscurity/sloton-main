# Build Fix - Service Worker Circular Dependency

## Issue

Build was failing with:
```
ReferenceError: Cannot access 'k' before initialization
at /api/service-worker/route.js
```

## Root Cause

The `src/lib/service-worker-config.ts` was importing `getConfig()` from `@/config`, which created a circular dependency during the build