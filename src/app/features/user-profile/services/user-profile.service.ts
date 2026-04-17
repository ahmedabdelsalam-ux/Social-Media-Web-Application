import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { UserProfileRespons } from '../model/user-profile.interface';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private readonly httpClient = inject(HttpClient);

  getUserProfile(id: string | null): Observable<UserProfileRespons> {
    return this.httpClient.get<UserProfileRespons>(
      environment.baseUrl + 'users/' + id + '/profile',
    );
  }
}
