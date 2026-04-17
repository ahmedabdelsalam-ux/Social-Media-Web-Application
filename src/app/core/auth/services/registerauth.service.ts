import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { RegisterRespons } from '../models/register.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterauthService {
  private readonly httpClient = inject(HttpClient);

  submitRegisterForm(data: object): Observable<RegisterRespons> {
    return this.httpClient.post<RegisterRespons>(environment.baseUrl + 'users/signup', data);
  }
}
