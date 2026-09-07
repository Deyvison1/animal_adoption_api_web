export const environment = {
  production: false,
  apiUrl: 'https://api.animal-adoption.com.br/api',
  apiUrlPublic: 'https://api.animal-adoption.com.br/public',
  keycloakConfig: {
    url: 'https://auth.animal-adoption.com.br:8080',
    realm: 'MY_KEYCLOAK',
    clientId: 'ANIMAL_ADOPTION_CLIENT_PUBLIC',
    urlAccount:
      'https://auth.animal-adoption.com.br:8080/realms/MY_KEYCLOAK/account/',
  },
};
