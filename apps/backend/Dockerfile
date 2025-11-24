# Production Dockerfile for Medusa v2
FROM node:20-alpine

# Set working directory
WORKDIR /server

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

RUN npx medusa build

# Expose API port
EXPOSE 9000

# Start the production server
CMD ["npm", "run", "start"]