FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

FROM nginx:alpine
# se existir browser, copia ele. Se não, copia a pasta normal
COPY --from=build /app/dist/animal-adoption-web/browser /usr/share/nginx/html 2>/dev/null \
 || COPY --from=build /app/dist/animal-adoption-web /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
