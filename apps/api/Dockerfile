# Production Dockerfile for Dedibox HDS
# Multi-stage build for NestJS API

# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copy workspace package files
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/core/package*.json ./packages/core/

# Install all dependencies
RUN npm ci

# Copy source code
COPY packages/core ./packages/core
COPY apps/api ./apps/api

# Build core package first
RUN npm run build --workspace=packages/core

# Generate Prisma Client & build API
WORKDIR /app/apps/api
RUN npx prisma generate
RUN npm run build

# Stage 2: Production runtime
FROM node:20-alpine AS runner
WORKDIR /app

# Create non-root user (HDS compliance)
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 -G nodejs

# Copy workspace node_modules and built files
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/prisma ./apps/api/prisma
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/package*.json ./apps/api/
COPY --from=builder --chown=nestjs:nodejs /app/packages/core/dist ./packages/core/dist
COPY --from=builder --chown=nestjs:nodejs /app/packages/core/package*.json ./packages/core/
COPY --from=builder --chown=nestjs:nodejs /app/package*.json ./

ENV NODE_ENV=production
ENV PORT=3002

USER nestjs

EXPOSE 3002

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3002/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

WORKDIR /app/apps/api
CMD ["node", "dist/main"]
