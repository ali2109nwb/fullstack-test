# Gunakan Node.js versi 20 sebagai base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json dulu (agar cache install lebih efisien)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua source code
COPY . .

# Build NestJS app
RUN npm run build

# Expose port default NestJS
EXPOSE 3000

# Command untuk start app
CMD ["npm", "run", "start:prod"]
