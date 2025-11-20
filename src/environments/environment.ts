export const environment = {
  production: true,
  apiUrl: 'http://api_animal_adoption:8081/api',
  apiUrlPublic: 'http://api_animal_adoption:8081/public',
  keycloakConfig: {
    url: 'https://keycloak:8443',
    realm: 'ANIMAL_ADOPTION',
    clientId: 'ANIMAL_ADOPTION_CLIENT',
    urlAccount:
      'https://keycloak:8443/realms/ANIMAL_ADOPTION/account/',
  },
};
