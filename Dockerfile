# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Kopiraj package fajlove i instaliraj dependencije
COPY package*.json ./
RUN npm install

# Kopiraj ostatak aplikacije i buildaj
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Kopiraj buildane fajlove iz prethodne faze u nginx public direktorij
COPY --from=builder /app/dist /usr/share/nginx/html

# Kopiraj prilagođenu Nginx konfiguraciju
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
