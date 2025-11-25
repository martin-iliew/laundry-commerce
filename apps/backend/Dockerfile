# Production Dockerfile for Medusa v2
FROM node:20

# Set working directory to build context
WORKDIR /server

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Build Medusa (creates .medusa/server)
RUN npx medusa build

# Switch to built output (needed)
WORKDIR /server/.medusa/server

EXPOSE 9000
CMD ["npm", "run", "start"]
