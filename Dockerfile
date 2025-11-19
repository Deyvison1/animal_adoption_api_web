# Etapa 1: Build Angular
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production --no-prerender

# Etapa 2: Servir com Nginx
FROM nginx:alpine
COPY --from=build /app/dist/animal-adoption-web/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
