import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ProfileRespons } from '../models/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly httpClient = inject(HttpClient);

  getMyProfile(): Observable<ProfileRespons> {
    return this.httpClient.get<ProfileRespons>(environment.baseUrl + 'users/profile-data');
  }

  uploadProfilePhoto(formData: FormData): Observable<any> {
    return this.httpClient.put(environment.baseUrl + 'users/upload-photo', formData);
  }
}
