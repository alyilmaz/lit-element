# Node based alpine is used
FROM node:20-alpine AS build

# define workspace
WORKDIR /app

# Install the dependecies
COPY package.json package-lock.json ./
RUN npm install 

# Copy project file and make build
COPY . .
RUN npm run build

# Nginx based alpine dist is used
FROM nginx:alpine

# Build folder is moved to target
COPY --from=build /app/dist /usr/share/nginx/html

# Expose Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]