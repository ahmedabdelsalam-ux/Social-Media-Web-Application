import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { NotificationsRespons } from '../models/notifications.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly httpClient = inject(HttpClient);

  getAllNotifications(): Observable<NotificationsRespons> {
    return this.httpClient.get<NotificationsRespons>(environment.baseUrl + 'notifications');
  }
  getUnreadNotifications(): Observable<NotificationsRespons> {
    return this.httpClient.get<NotificationsRespons>(
      environment.baseUrl + 'notifications?unread=false',
    );
  }
  getUnreadNotificationsCount(): Observable<any> {
    return this.httpClient.get<NotificationsRespons>(
      environment.baseUrl + 'notifications/unread-count',
    );
  }

  makeAllNotificationsRead(): Observable<any> {
    return this.httpClient.patch(environment.baseUrl + 'notifications/read-all', {});
  }

  makeNotificationRead(id: string): Observable<any> {
    return this.httpClient.patch(environment.baseUrl + 'notifications/' + id + '/read', {});
  }
}
