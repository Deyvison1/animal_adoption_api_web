# Etapa 1: Build da aplicação Angular
FROM node:20-alpine AS build

# Diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código da aplicação
COPY . .

# Build Angular para produção
# Substitua "animal-adoption" pelo nome real do seu projeto Angular
RUN npm run build -- --output-path=dist/animal-adoption-web --configuration production

# Etapa 2: Servir com Nginx
FROM nginx:alpine

# Copiar build para a pasta padrão do Nginx
COPY --from=build /app/dist/animal-adoption-web /usr/share/nginx/html

# Copiar configuração personalizada do Nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
