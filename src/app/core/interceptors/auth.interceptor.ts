import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { KeycloakService } from '../services/keycloak.service';
import { from, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const keycloakService = inject(KeycloakService);

  // Ignora chamadas públicas (ex: backend /public/**)
  if (req.url.includes('/public/')) {
    return next(req);
  }

  return from(keycloakService.getToken()).pipe(
    switchMap((token) => {
      let headers = req.headers || new HttpHeaders();
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }

      return next(req.clone({ headers })).pipe(
        tap({
          error: (err) => {
            if (err.status === 401) keycloakService.logout();
            if (err.status === 403) router.navigateByUrl('/admin/forbidden');
          },
        })
      );
    })
  );
};
