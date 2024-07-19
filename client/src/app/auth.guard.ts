import { Inject, inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanDeactivateFn,
} from '@angular/router';
import { SessionChecker } from './utils/sessionCheck';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const sessionCheck: SessionChecker = inject(SessionChecker);

  const router: Router = inject(Router);
  const protectedRoutes: string[] = ['/'];
  const session = sessionCheck.getSession();
  if (state.url == '/auth' && session) {
    console.log(session);
    return router.navigate(['/']);
  }
  return protectedRoutes.includes(state.url) && !session
    ? router.navigate(['/auth'])
    : true;
};
