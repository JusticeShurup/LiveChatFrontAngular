import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export function authGuard() : CanActivateFn {
    return () => {
        const authService : AuthService = inject(AuthService)
        const router : Router = inject(Router)

        if (authService.isAuthSignal()) {
            return true
        }

        router.navigate(['/login'])
        return false; 
    }
}