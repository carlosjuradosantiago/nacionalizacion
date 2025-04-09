import { Injectable, inject } from '@angular/core';
import { CanActivate, CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanMatch {
  
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  
  private checkAuthentication(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
      
      if (!isAuthenticated) {
        this.router.navigate(['/auth/login']);
        return false;
      }
      
      return true;
    } else {
      return true;
    }
  }
  
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthentication();
  }
  
  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthentication();
  }
} 