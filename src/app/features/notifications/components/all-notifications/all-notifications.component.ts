import { Component, inject, OnInit } from '@angular/core';
import { NotificationStateService } from '../../services/notification-state.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-all-notifications',
  standalone: true,
  imports: [NotificationComponent],
  templateUrl: './all-notifications.component.html',
  styleUrl: './all-notifications.component.css',
})
export class AllNotificationsComponent implements OnInit {
  private readonly notificationStateService = inject(NotificationStateService);

  notifications = this.notificationStateService.notifications;

  ngOnInit(): void {
    this.notificationStateService.getAllNotificationsData();
  }
}
