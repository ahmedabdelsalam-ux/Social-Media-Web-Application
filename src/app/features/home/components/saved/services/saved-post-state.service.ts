import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../../../../core/services/posts/posts.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SavedPostStateService {
  private readonly postsService = inject(PostsService);
  private readonly platId = inject(PLATFORM_ID);

  savedPosts: WritableSignal<any[]> = signal<any[]>([]);

  getSavedPostData(): void {
    if (isPlatformBrowser(this.platId)) {
      if (localStorage.getItem('usertoken')) {
        this.postsService.getSavedPosts().subscribe({
          next: (res) => {
            if (res.success === true) {
              this.savedPosts.set(res.data.bookmarks);
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
