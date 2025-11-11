import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from '../services/keycloak.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const keycloak = inject(KeycloakService);
  const router = inject(Router);

  // 1) Usuário não logado → manda pro login
  if (!keycloak.isLoggedIn()) {
    keycloak.login(globalThis.location.origin + state.url);
    return false;
  }

  // 2) Rota tem roles exigidos?
  const requiredRoles = route.data?.['roles'] as string[] | undefined;

  if (requiredRoles && requiredRoles.length > 0) {
    const userRoles = keycloak.getRoles();
    const hasPermission = requiredRoles.some((role) =>
      userRoles.includes(role)
    );

    if (!hasPermission) {
      router.navigate(['/admin/forbidden']);
      return false;
    }
  }

  return true;
};
