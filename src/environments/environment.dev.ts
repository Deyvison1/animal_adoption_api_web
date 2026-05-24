export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081/api',
  apiUrlPublic: 'http://localhost:8081/public',
  keycloakConfig: {
    url: 'https://keycloak.animal-adoption.com.br',
    realm: 'MY_KEYCLOAK',
    clientId: 'ANIMAL_ADOPTION_CLIENT_PUBLIC',
    urlAccount:
      'https://keycloak.animal-adoption.com.br/realms/MY_KEYCLOAK/account/',
  },
};
