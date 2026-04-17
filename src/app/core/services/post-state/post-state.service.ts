import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../posts/posts.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PostStateService {
  private readonly postsService = inject(PostsService);
  private readonly platId = inject(PLATFORM_ID);

  AllPosts: WritableSignal<any[]> = signal([]);
  getAllPostsData(): void {
    if (isPlatformBrowser(this.platId)) {
      if (localStorage.getItem('usertoken')) {
        this.postsService.getAllPosts().subscribe({
          next: (res) => {
            if (res.success == true) {
              this.AllPosts.set(res.data.posts);
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }
}
