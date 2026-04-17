import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const platId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platId)) {
    const token = localStorage.getItem('usertoken');

    if (token) {
      if (
        req.url.includes('posts') ||
        req.url.includes('notifications') ||
        req.url.includes('change-password') ||
        req.url.includes('upload-photo') ||
        req.url.includes('profile-data') ||
        req.url.includes('bookmarks') ||
        req.url.includes('suggestions') ||
        req.url.includes('profile') ||
        req.url.includes('profile') ||
        req.url.includes('follow')
      ) {
        req = req.clone({
          setHeaders: {
            authorization: `Bearer ${token}`,
          },
        });
      }
    }
  }

  return next(req);
};
