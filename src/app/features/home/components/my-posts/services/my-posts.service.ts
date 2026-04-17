import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../../../../core/services/posts/posts.service';

@Injectable({
  providedIn: 'root',
})
export class MyPostsService {
  private readonly postsService = inject(PostsService);
  private readonly platId = inject(PLATFORM_ID);

  myposts: WritableSignal<any[]> = signal<any[]>([]);
  totalCount = signal<number>(0);

  myId!: string;

  getMyPostData(): void {
    if (isPlatformBrowser(this.platId)) {
      this.myId = localStorage.getItem('userId')!;

      if (localStorage.getItem('usertoken')) {
        this.postsService.getMyPosts(this.myId!).subscribe({
          next: (res) => {
            if (res.success === true) {
              this.myposts.set(res.data.posts ?? res.data);
              this.totalCount.set(res.data.total ?? res.data.meta?.total ?? this.myposts().length);
            }
          },
          error: (err) => {
            console.error(err.error);
          },
        });
      }
    }
  }
}
