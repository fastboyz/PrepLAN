import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(public authService: AuthService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.currentUserValue;
        const expectedRole = route.data.expectedRole;
        let currentRole: string;
        this.authService.getRole().subscribe(role => {
            currentRole = role.name;
        })

        if (currentUser && currentRole.toLowerCase() == expectedRole.toLowerCase()) {
            if (currentRole.toLowerCase() == expectedRole.toLowerCase()) {
                // logged in and role is expected so return true
                return true;
            }
            this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
            return false;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}