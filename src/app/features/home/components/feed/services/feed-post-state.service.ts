import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../../../../core/services/posts/posts.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class FeedPostStateService {
  private readonly postsService = inject(PostsService);
  private readonly platId = inject(PLATFORM_ID);

  feedPosts: WritableSignal<any[]> = signal<any[]>([]);

  getFeedPostData(): void {
    if (isPlatformBrowser(this.platId)) {
      if (localStorage.getItem('usertoken')) {
        this.postsService.getFeedPosts().subscribe({
          next: (res) => {
            if (res.success == true) {
              this.feedPosts.set(res.data?.posts ?? []);
            }
          },
          error: (err) => {
            console.log(err.error);
          },
        });
      }
    }
  }
}
