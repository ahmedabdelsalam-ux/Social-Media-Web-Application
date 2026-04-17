import { Component, inject, OnInit, signal } from '@angular/core';
import { Notification } from '../../models/notifications.interface';
import { NotificationService } from '../../services/notification.service';
import { NotificationComponent } from '../notification/notification.component';
import { NotificationStateService } from '../../services/notification-state.service';

@Component({
  selector: 'app-unread-notifications',
  imports: [NotificationComponent],
  templateUrl: './unread-notifications.component.html',
  styleUrl: './unread-notifications.component.css',
})
export class UnreadNotificationsComponent implements OnInit {
  private readonly notificationService = inject(NotificationService);
  private readonly notificationStateService = inject(NotificationStateService);

  unreadNotifications = this.notificationStateService.unreadNotifications;

  ngOnInit(): void {
    this.notificationStateService.getUnreadNotificationsData();
  }
}
