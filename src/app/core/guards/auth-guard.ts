import { CanActivateChildFn, CanMatchFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateChildFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // إذا كان الكود شغال على السيرفر، مرره بسلام عشان يوصل للمتصفح
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // الآن نحن متأكدون أننا في المتصفح
  const token = localStorage.getItem('usertoken');

  if (!token) {
    return router.createUrlTree(['/login']);
  }

  return true;
};
