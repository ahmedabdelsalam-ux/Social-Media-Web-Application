import { Component, computed, inject } from '@angular/core';
import { NotificationService } from './services/notification.service';

import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NotificationStateService } from './services/notification-state.service';

@Component({
  selector: 'app-notifications',
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  private readonly notificationService = inject(NotificationService);
  private readonly notificationStateService = inject(NotificationStateService);

  unreadCount = computed(() => this.notificationStateService.unreadCount());

  markAllAsRead() {
    this.notificationService.makeAllNotificationsRead().subscribe({
      next: (res) => {
        if (res.success === true) {
          this.notificationStateService.getAllNotificationsData();
          this.notificationStateService.getUnreadNotificationsData();
          this.notificationStateService.loadUnreadCount();
        }
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
}
