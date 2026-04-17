import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, output } from '@angular/core';
import { TimeagoPipe } from '../../../../shared/pipes/timeago-pipe';
import { Notification } from '../../models/notifications.interface';
import { NotificationStateService } from '../../services/notification-state.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, TimeagoPipe],

  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {
  // ✅ Signal Input
  notification = input.required<Notification>();
  private readonly notificationService = inject(NotificationService);
  private readonly notificationStateService = inject(NotificationStateService);

  // ✅ Output event
  toggle = output<Notification>();

  // ✅ computed بدل function
  badgeClass = computed(() => {
    const map: Record<string, string> = {
      like_post: 'badge-like',
      comment_post: 'badge-comment',
      follow: 'badge-follow',
      share_post: 'badge-share', // ✅ ضيف دي هنا
    };
    return map[this.notification().type] ?? 'badge-default';
  });

  toggleRead(id: string): void {
    this.notificationService.makeNotificationRead(id).subscribe({
      next: (res) => {
        if (res.success === true) {
          console.log(res);
          this.notificationStateService.getAllNotificationsData();
          this.notificationStateService.getUnreadNotificationsData();
          this.notificationStateService.loadUnreadCount();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // ✅ نص الإجراء بشكل مقروء
  actionText = computed(() => {
    if (this.notification().entity?.unavailable) {
      return 'reacted on a deleted post';
    }

    const map: Record<string, string> = {
      like_post: 'liked your post',
      comment_post: 'commented on your post',
      follow: 'started following you',
      share_post: 'shared your post', // ✅ الصح هنا
    };

    return map[this.notification().type] ?? 'did something';
  });
}
