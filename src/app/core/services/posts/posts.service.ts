import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

import { PostDataRespons } from '../../models/post-data.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly httpClient = inject(HttpClient);

  getAllPosts(): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl + 'posts');
  }

  creatPost(data: object): Observable<PostDataRespons> {
    return this.httpClient.post<PostDataRespons>(environment.baseUrl + 'posts', data);
  }

  getSinglPost(postId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'posts/' + postId);
  }

  deletPost(postId: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + 'posts/' + postId);
  }

  savePost(postId: string): Observable<any> {
    return this.httpClient.put<any>(environment.baseUrl + 'posts/' + postId + '/bookmark', {});
  }

  likePost(postId: string): Observable<any> {
    return this.httpClient.put(environment.baseUrl + 'posts/' + postId + '/like', {});
  }

  getPostLikes(postId: string): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl + 'posts/' + postId + '/likes');
  }

  sharePost(postId: string, data: object): Observable<any> {
    return this.httpClient.post<any>(environment.baseUrl + 'posts/' + postId + '/share', data);
  }

  editPost(postId: string, data: FormData): Observable<any> {
    return this.httpClient.put<any>(environment.baseUrl + 'posts/' + postId, data);
  }

  getFeedPosts(): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl + 'posts/feed');
  }
  getSavedPosts(): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl + 'users/bookmarks');
  }

  getMyPosts(userId: string): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl + 'users/' + userId + '/posts');
  }

  getSingelPost(postId: string): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl + 'posts/' + postId);
  }
}
