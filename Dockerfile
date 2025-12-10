# syntax=docker/dockerfile:1

# --- Builder ---
FROM node:18-bookworm AS builder
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
# Compile TS to JS in /app/build
RUN npm run builder

# --- Runtime ---
FROM node:18-bookworm-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app

# Copy compiled app (Adonis build contains its own package.json/lock)
COPY --from=builder /app/build .

# Install only production deps (based on build/package.json)
RUN npm ci --omit=dev

# Network
EXPOSE 3333

# Adonis needs to bind to 0.0.0.0 inside container
ENV HOST=0.0.0.0

CMD ["node", "server.js"]


