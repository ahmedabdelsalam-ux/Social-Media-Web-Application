import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { FrindesDataRespons } from '../models/frindes-data.interface';

@Injectable({
  providedIn: 'root',
})
export class FrindesService {
  private readonly httpClient = inject(HttpClient);

  getFollowSuggestions(): Observable<FrindesDataRespons> {
    return this.httpClient.get<FrindesDataRespons>(
      environment.baseUrl + 'users/suggestions?limit=50',
    );
  }

  folowUser(userId: string): Observable<any> {
    return this.httpClient.put(
      environment.baseUrl + 'users/' + userId + '/follow',
      {},
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('usertoken')!}`,
        },
      },
    );
  }
}
