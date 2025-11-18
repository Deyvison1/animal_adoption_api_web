# Etapa 1: Build da aplicação
FROM node:20-alpine AS build

# Diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json / pnpm-lock.yaml
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código da aplicação
COPY . .

# Build da aplicação Angular para produção
RUN npm run build -- --output-path=dist

# Etapa 2: Servir com Nginx
FROM nginx:alpine

# Copiar build da etapa anterior para a pasta padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuração personalizada do Nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta padrão do Nginx
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
