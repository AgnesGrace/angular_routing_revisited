import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard {
  constructor(private _authService: AuthService, private _router: Router) {}
  async canActivate() {
    return this._authService
      .isAuthenticated()
      .then((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          return true;
        } else {
          this._router.navigate(['/']);
        }
      });
  }
  canActivateChild() {
    return this.canActivate();
  }
}
