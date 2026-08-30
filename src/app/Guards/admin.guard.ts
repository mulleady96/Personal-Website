import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../Services/auth.service";

export const adminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = await authService.getCurrentUser();

  if (user) {
    const isAdmin = await authService.checkIfAdmin(user);
    if (isAdmin) {
      return true;
    }
  }

  // Not authorized, redirect to login
  router.navigate(["/admin/login"]);
  return false;
};
