import { inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn, HttpClient } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const http = inject(HttpClient);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');

    // 🔒 Routes protégées (nécessitent un token)
    const protectedRoutes = ['/dashbord', '/profil','/service'];

    // 🔓 Routes publiques (pas besoin de token)
    const publicRoutes = ['/login', '/register', '/'];

    let authReq = req;

    // ✅ Ajouter le token uniquement si la route est protégée
    if (token && protectedRoutes.some(route => req.url.includes(route))) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next(authReq).pipe(
      catchError(err => {
        // 🔄 Tentative de refresh uniquement pour les routes protégées
        if (err.status === 401 && protectedRoutes.some(route => req.url.includes(route))) {
          return http.post<any>(`${environment.apiUrlNode}auth/refresh`, {}, { withCredentials: true })
            .pipe(
              switchMap(res => {
                if (res.data?.token) {
                  localStorage.setItem('token', res.data.token);
                  const newReq = req.clone({
                    setHeaders: { Authorization: `Bearer ${res.data.token}` }
                  });
                  return next(newReq);
                }
                return throwError(() => err);
              }),
              catchError(() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
                return throwError(() => err);
              })
            );
        }
        return throwError(() => err);
      })
    );
  }

  return next(req);
};
