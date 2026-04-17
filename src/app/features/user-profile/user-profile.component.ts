import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserProfile } from './model/user-profile.interface';
import { UserProfileService } from './services/user-profile.service';
import { popNumber } from 'rxjs/internal/util/args';
import { DecimalPipe, isPlatformBrowser } from '@angular/common';
import { PostsService } from '../../core/services/posts/posts.service';
import { SinglpostComponent } from '../../shared/components/singlpost/singlpost.component';
import { FrindesService } from '../suggestfriends/services/frindes.service';

@Component({
  selector: 'app-user-profile',
  imports: [DecimalPipe, RouterLink, SinglpostComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly userProfileService = inject(UserProfileService);
  private readonly postsService = inject(PostsService);
  private readonly frindesService = inject(FrindesService);
  private readonly platId = inject(PLATFORM_ID);

  userId: string | null = null;

  userPofile: WritableSignal<UserProfile | null> = signal<UserProfile | null>(null);

  userPosts: WritableSignal<any[]> = signal<any[]>([]);

  ngOnInit(): void {
    this.getUserId();
    if (this.userId != null) {
      this.getUserProfile();
      this.getMyPostData();
    }
  }

  getUserId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (pramUrl) => {
        this.userId = pramUrl.get('id');
      },
    });
  }

  getUserProfile(): void {
    if (isPlatformBrowser(this.platId)) {
      if (localStorage.getItem('usertoken')) {
        this.userProfileService.getUserProfile(this.userId).subscribe({
          next: (res) => {
            if (res.success === true) {
              this.userPofile.set(res.data);
            }
          },
          error: (err) => {
            console.log(err.error);
          },
        });
      }
    }
  }

  getMyPostData(): void {
    if (isPlatformBrowser(this.platId)) {
      if (localStorage.getItem('usertoken')) {
        this.postsService.getMyPosts(this.userId!).subscribe({
          next: (res) => {
            if (res.success === true) {
              this.userPosts.set(res.data.posts ?? res.data);
            }
          },
          error: (err) => {
            console.error(err.error);
          },
        });
      }
    }
  }

  toggleFollow(): void {
    this.frindesService.folowUser(this.userId!).subscribe({
      next: (res) => {
        if (res.success === true) {
          this.getUserProfile();
        }
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
}
