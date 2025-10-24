# Coolify Deployment Guide

This guide explains how to deploy this Next.js application to Coolify.

## Prerequisites

- A Coolify instance set up and running
- Git repository connected to Coolify
- Domain name configured (optional)

## Deployment Steps

### 1. Create New Resource in Coolify

1. Log in to your Coolify dashboard
2. Click "Add New Resource"
3. Select "Docker Compose" or "Dockerfile"
4. Connect your Git repository

### 2. Configure Build Settings

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

**Port:** `3000`

### 3. Environment Variables

The application doesn't require any environment variables by default. However, you can add the following optional variables:

- `NEXT_TELEMETRY_DISABLED=1` - Disable Next.js telemetry
- `NODE_ENV=production` - Set Node environment (automatically set)

### 4. Docker Deployment (Recommended)

If using the Dockerfile for deployment:

1. Coolify will automatically detect the `Dockerfile` in the root
2. The build process uses multi-stage builds for optimization
3. The final image runs as a non-root user for security

**Docker Build Command:**
```bash
docker build -t nextjs-coolify .
docker run -p 3000:3000 nextjs-coolify
```

### 5. Health Checks

The Dockerfile includes a health check that pings the application every 30 seconds. This ensures Coolify can detect if the application becomes unhealthy.

## Security Features

This application includes the following security features:

- **Security Headers**: Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options, etc.
- **Non-root Docker User**: Application runs as user `nextjs` (UID 1001)
- **No Secrets in Code**: All sensitive data should be in environment variables
- **Updated Dependencies**: All packages are up-to-date with no known vulnerabilities
- **Standalone Output**: Optimized build with minimal dependencies

## Testing

Run tests before deployment:

```bash
npm test           # Run all tests
npm run test:coverage  # Run with coverage report
```

## Build Verification

Verify the build works locally:

```bash
npm run build
npm start
```

Then visit `http://localhost:3000`

## Troubleshooting

### Build Fails Due to Font Loading

The app uses system fonts to avoid external dependencies. If you see font-related errors, ensure the latest version is deployed.

### Port Already in Use

Change the port in Coolify settings or set the `PORT` environment variable.

### Memory Issues

If the build runs out of memory, increase the memory limit in Coolify's resource settings.

## Performance Optimization

- The application uses Next.js standalone output mode for smaller Docker images
- Static pages are pre-rendered at build time
- Images are optimized automatically by Next.js

## Support

For issues with Coolify deployment, visit:
- Coolify Documentation: https://coolify.io/docs
- Coolify GitHub: https://github.com/coollabsio/coolify
