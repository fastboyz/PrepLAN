import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(public authService: AuthService, public router: Router) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.currentUserValue;
        const expectedRole: string = route.data.expectedRole;
        let currentRole =  await this.authService.getRole().toPromise();
        let currentRoleName:string = currentRole.name;

        if (currentUser) {
            if (currentRoleName.toLowerCase() == expectedRole.toLowerCase()) {
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