import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LogOutService {
  private readonly router = inject(Router);

  userLogOut(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('usertoken');

    this.router.navigate(['/login']);
  }
}
