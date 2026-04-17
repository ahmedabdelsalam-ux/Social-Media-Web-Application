import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { NotificationService } from './notification.service';
import { Notification } from '../models/notifications.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class NotificationStateService {
  private readonly notificationService = inject(NotificationService);
  private readonly platId = inject(PLATFORM_ID);
  notifications = signal<Notification[]>([]);
  unreadNotifications = signal<Notification[]>([]);
  unreadCount = signal(0);

  getAllNotificationsData(): void {
    if (isPlatformBrowser(this.platId)) {
      if (localStorage.getItem('usertoken')) {
        this.notificationService.getAllNotifications().subscribe({
          next: (res) => {
            if (res.success) {
              this.notifications.set(res.data.notifications);
            }
          },
          error: (err) => {
            console.log(err.error);
          },
        });
      }
    }
  }

  getUnreadNotificationsData(): void {
    if (isPlatformBrowser(this.platId)) {
      if (localStorage.getItem('usertoken')) {
        this.notificationService.getUnreadNotifications().subscribe({
          next: (res) => {
            if (res.success) {
              this.unreadNotifications.set(res.data.notifications);
            }
          },
          error: (err) => {
            console.log(err.error);
          },
        });
      }
    }
  }

  loadUnreadCount(): void {
    if (isPlatformBrowser(this.platId)) {
      if (localStorage.getItem('usertoken')) {
        this.notificationService.getUnreadNotificationsCount().subscribe({
          next: (res) => {
            this.unreadCount.set(res.data?.unreadCount ?? 0);
          },
          error: (err) => console.log(err.error),
        });
      }
    }
  }
}
