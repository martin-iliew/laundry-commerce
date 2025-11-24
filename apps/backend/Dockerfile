FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npx medusa build

FROM node:20-alpine AS runner

WORKDIR /server
ENV NODE_ENV=production

COPY --from=builder /app/.medusa/server ./

RUN npm ci --omit=dev

EXPOSE 9000

CMD ["npm", "run", "start"]
