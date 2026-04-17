import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRespons } from '../models/register.interface';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginauthService {
  private readonly httpClient = inject(HttpClient);

  submitLoginForm(data: object): Observable<RegisterRespons> {
    return this.httpClient.post<RegisterRespons>(environment.baseUrl + 'users/signin', data);
  }
}
