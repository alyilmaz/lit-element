# 1. Node.js ile bağımlılıkları yükle
FROM node:20-alpine AS build

# Çalışma dizinini belirle
WORKDIR /app

# Bağımlılık dosyalarını kopyala ve yükle
COPY package.json package-lock.json ./
RUN npm install 

# Proje dosyalarını kopyala ve build işlemini yap
COPY . .
RUN npm run build

# 2. Nginx ile serve etmek için ikinci aşama
FROM nginx:alpine

# Build edilen dosyaları Nginx dizinine kopyala
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx'in portunu aç
EXPOSE 80

# Nginx başlat
CMD ["nginx", "-g", "daemon off;"]