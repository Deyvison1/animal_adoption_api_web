export const environment = {
  production: true,
  apiUrl: '/api',
  apiUrlPublic: '/public',
  keycloakConfig: {
    url: 'https://keycloak.animal-adoption.com.br:8443',
    realm: 'MY_KEYCLOAK',
    clientId: 'ANIMAL_ADOPTION_CLIENT_PUBLIC',
    urlAccount:
      'https://keycloak.animal-adoption.com.br:8443/realms/MY_KEYCLOAK/account/',
  },
};
