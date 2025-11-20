export const environment = {
  production: false,
  apiUrl: 'http://api.barbershop-app.shop:8081/api',
  apiUrlPublic: 'http://api.barbershop-app.shop:8081/public',
  keycloakConfig: {
    url: 'https://keycloak.barbershop-app.shop:8443',
    realm: 'ANIMAL_ADOPTION',
    clientId: 'ANIMAL_ADOPTION_CLIENT',
    urlAccount:
      'https://keycloak.barbershop-app.shop:8443/realms/ANIMAL_ADOPTION/account/',
  },
};
