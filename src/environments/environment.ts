export const environment = {
  production: true,
  apiUrl: 'http://api.animal-adoption.com.br/api',
  apiUrlPublic: 'http://api.animal-adoption.com.br/public',
  keycloakConfig: {
    url: 'https://auth.animal-adoption.com.br',
    realm: 'MY_KEYCLOAK',
    clientId: 'ANIMAL_ADOPTION_CLIENT_PUBLIC',
    urlAccount:
      'https://auth.animal-adoption.com.br/realms/MY_KEYCLOAK/account/',
  },
};