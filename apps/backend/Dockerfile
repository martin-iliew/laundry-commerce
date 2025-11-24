# Production Dockerfile for Medusa
FROM node:20-alpine

# Set working directory
WORKDIR /server

# Copy only package files first for better caching
COPY package.json package-lock.json ./

# Install dependencies (production mode)
RUN npm install --legacy-peer-deps --production=false

# Copy all source code
COPY . .

# Ensure start.sh uses LF and is executable
RUN chmod +x start.sh

# Build Medusa backend for production
RUN npm run build

# Expose Medusa port
EXPOSE 9000

# Start production server through the start script (runs migrations + start)
CMD ["sh", "./start.sh"]
