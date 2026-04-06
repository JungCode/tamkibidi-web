FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# --- Install dependencies ---
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

# --- Build Stage ---
FROM base AS builder
# Bước 1: Nhận biến từ lệnh build bên ngoài
ARG NEXT_PUBLIC_GRAPHQL_URL
# Bước 2: Gán vào ENV để Next.js dùng lúc 'pnpm run build'
ENV NEXT_PUBLIC_GRAPHQL_URL=$NEXT_PUBLIC_GRAPHQL_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# --- Production Runner Stage ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# QUAN TRỌNG: Phải khai báo lại ARG và ENV ở tầng này
ARG NEXT_PUBLIC_GRAPHQL_URL
ENV NEXT_PUBLIC_GRAPHQL_URL=$NEXT_PUBLIC_GRAPHQL_URL

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package.json ./

EXPOSE 3000
CMD ["pnpm", "run", "start"]