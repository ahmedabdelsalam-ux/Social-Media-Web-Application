import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ChangePasswordRespons } from '../model/change-password.interface';

@Injectable({
  providedIn: 'root',
})
export class ChangPasswordService {
  private readonly httpClient = inject(HttpClient);

  changePassword(data: object): Observable<ChangePasswordRespons> {
    return this.httpClient.patch<ChangePasswordRespons>(
      environment.baseUrl + 'users/change-password',
      data,
    );
  }
}
