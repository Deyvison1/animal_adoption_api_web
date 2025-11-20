export const environment = {
  production: true,
  apiUrl: '/api',
  apiUrlPublic: '/public',
  keycloakConfig: {
    url: 'https://keycloak.barbershop-app.shop:8443',
    realm: 'ANIMAL_ADOPTION',
    clientId: 'ANIMAL_ADOPTION_CLIENT',
    urlAccount:
      'https://keycloak.barbershop-app.shop:8443/realms/ANIMAL_ADOPTION/account/',
  },
};
