/*
 * src/app/core/interceptors/auth.interceptor.ts
 *
 * Interceptor HTTP funcional para adicionar o token de autenticação.
 */
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth';
 
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();

  if (authToken) {
    // Clona a requisição e adiciona o header Authorization com o token
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next(authReq);
  }

  // Se não houver token, prossegue com a requisição original
  return next(req);
};