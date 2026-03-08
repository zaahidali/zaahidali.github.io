# Docker Patterns That Actually Matter

After containerizing dozens of production services, here are the patterns I keep coming back to — and the anti-patterns I see teams repeat.

## Multi-Stage Builds

This is non-negotiable. If your Dockerfile doesn't use multi-stage builds, your images are bloated.

**Bad — everything in one stage:**

```dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["node", "dist/index.js"]
# Image size: ~1.2GB
```

**Good — multi-stage:**

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/index.js"]
# Image size: ~150MB
```

That's an **8x reduction** in image size. Faster deploys, less storage, smaller attack surface.

## Health Checks

Always define health checks. Orchestrators like Kubernetes and Docker Swarm use them to know if your container is actually serving traffic.

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1
```

In your app, expose a `/health` endpoint:

```typescript
app.get('/health', (req, res) => {
  // Check database connection, cache, etc.
  const dbHealthy = await checkDatabase();
  
  if (dbHealthy) {
    res.status(200).json({ status: 'healthy' });
  } else {
    res.status(503).json({ status: 'unhealthy' });
  }
});
```

## .dockerignore

This file is as important as `.gitignore`. Without it, you're copying `node_modules`, `.git`, and test files into your build context:

```text
node_modules
.git
.env
*.test.ts
coverage
dist
```

## Environment Variables Done Right

Never bake secrets into images. Use environment variables at runtime:

```yaml
# docker-compose.yml
services:
  api:
    image: my-api:latest
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
    env_file:
      - .env.production
```

## The Logging Rule

**Log to stdout/stderr, never to files.** Let the container runtime handle log aggregation:

```typescript
// Good
console.log(JSON.stringify({ level: 'info', message: 'Request processed', duration: 42 }));

// Bad
fs.appendFileSync('/var/log/app.log', 'Request processed\n');
```

Docker captures stdout automatically. Tools like Loki, CloudWatch, or ELK can ingest these logs without any in-container log rotation.

## Summary

| Pattern | Why |
|---------|-----|
| Multi-stage builds | Smaller, more secure images |
| Health checks | Reliable orchestration |
| .dockerignore | Faster builds, no leaked secrets |
| Env vars at runtime | Portable, secure configuration |
| Stdout logging | Let infrastructure handle logs |

These aren't fancy tricks — they're fundamentals. Get them right and your containers will be production-ready from day one.
