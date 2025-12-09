# Production Dockerfile for Scaleway Serverless Containers
# Optimized multi-stage build for NestJS API

# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/

# Install dependencies
RUN npm ci --only=production && \
    cd apps/api && npm ci --only=production

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/

# Install all dependencies (including dev)
RUN npm ci && cd apps/api && npm ci

# Copy source code
COPY apps/api ./apps/api

# Generate Prisma Client
WORKDIR /app/apps/api
RUN npx prisma generate

# Build application
RUN npm run build

# Stage 3: Production runtime
FROM node:20-alpine AS runner
WORKDIR /app

# Create non-root user for security (HDS compliance)
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 -G nodejs

# Copy production dependencies
COPY --from=deps --chown=nestjs:nodejs /app/apps/api/node_modules ./node_modules
COPY --from=deps --chown=nestjs:nodejs /app/node_modules ./root_node_modules

# Copy built application
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/prisma ./prisma
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/package*.json ./

# Set NODE_ENV
ENV NODE_ENV=production
ENV PORT=3001

# Switch to non-root user
USER nestjs

# Expose port
EXPOSE 3001

# Health check for Scaleway monitoring
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["node", "dist/main"]
