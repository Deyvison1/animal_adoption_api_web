export const environment = {
  production: true,
  apiUrl: '/api',
  apiUrlPublic: '/public',
  keycloakConfig: {
    url: 'http://keycloak.animal-adoption.com.br:8080',
    realm: 'MY_KEYCLOAK',
    clientId: 'ANIMAL_ADOPTION_CLIENT_PUBLIC',
    urlAccount:
      'http://keycloak.animal-adoption.com.br:8080/realms/MY_KEYCLOAK/account/',
  },
};