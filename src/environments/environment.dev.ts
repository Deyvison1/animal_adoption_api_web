export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081/api',
  apiUrlPublic: 'http://localhost:8081/public',
  keycloakConfig: {
    url: 'http://192.168.18.7:8080',
    realm: 'MY_KEYCLOAK',
    clientId: 'ANIMAL_ADOPTION_CLIENT_PUBLIC',
    urlAccount:
      'http://192.168.18.7:8080/realms/MY_KEYCLOAK/account/',
  },
};
