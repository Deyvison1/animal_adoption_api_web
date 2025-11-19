# Etapa 1: Build Angular
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production --no-prerender

# Etapa 2: Servir com Nginx + SSL
FROM nginx:alpine

# Copia arquivos do Angular
COPY --from=build /app/dist/animal-adoption-web/browser /usr/share/nginx/html

# Copia certificados e config nginx
COPY certs /etc/nginx/certs
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
