import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CommentsResponse } from '../../../shared/components/comments/models/comments.interface';
import { SingelcommentResponse } from '../../../shared/components/comments/models/singelcomment.interface';
import { LikeCommentRespons } from '../../../shared/components/comments/models/likecomment.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly httpClient = inject(HttpClient);

  getPostComment(postId: string): Observable<CommentsResponse> {
    return this.httpClient.get<CommentsResponse>(environment.baseUrl + `posts/${postId}/comments`);
  }

  creatComment(postId: string, data: object): Observable<SingelcommentResponse> {
    return this.httpClient.post<SingelcommentResponse>(
      environment.baseUrl + `posts/${postId}/comments`,
      data,
    );
  }

  deletComemnt(postId: string, commentId: string): Observable<any> {
    return this.httpClient.delete<any>(
      environment.baseUrl + `posts/${postId}/comments/${commentId}`,
    );
  }

  updateComment(postId: string, commentId: string, data: FormData) {
    return this.httpClient.put(`${environment.baseUrl}posts/${postId}/comments/${commentId}`, data);
  }

  getCommentReplies(postId: string, commentId: string): Observable<any> {
    return this.httpClient.get(
      environment.baseUrl + `posts/${postId}/comments/${commentId}/replies`,
    );
  }

  creatReply(postId: string, commentId: string, data: object): Observable<SingelcommentResponse> {
    return this.httpClient.post<SingelcommentResponse>(
      environment.baseUrl + `posts/${postId}/comments/${commentId}/replies`,
      data,
    );
  }

  likeComment(postId: string, commentId: string): Observable<LikeCommentRespons> {
    return this.httpClient.put<LikeCommentRespons>(
      `${environment.baseUrl}posts/${postId}/comments/${commentId}/like`,
      {},
    );
  }
}
