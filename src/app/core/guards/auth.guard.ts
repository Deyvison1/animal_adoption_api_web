import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { KeycloakService } from '../services/keycloak.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const keycloak = inject(KeycloakService);

  if (!keycloak.isLoggedIn()) {
    keycloak.login(globalThis.location.origin + state.url);
    return false;
  }

  return true;
};
