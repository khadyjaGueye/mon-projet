import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { TokenService } from '../services/token.service';

export const adminGuard: CanActivateFn = () => {

  const tokenService = inject(TokenService);
  const router = inject(Router);

  // Pas de token
  if (!tokenService.getToken()) {
    return router.createUrlTree(['/login']);
  }

  return tokenService.getCurrentUser().pipe(

    map((res: any) => {

      const user = res.data?.user;

      if (user && user.role === 'admin') {
        return true;
      }

      return router.createUrlTree(['/login']);
    }),

    catchError((error) => {

      console.error('❌ AdminGuard :', error);

      return of(
        router.createUrlTree(['/login'])
      );
    })
  );
};