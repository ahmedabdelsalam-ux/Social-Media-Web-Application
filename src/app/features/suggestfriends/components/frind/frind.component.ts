import { Component, inject, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { FrindesService } from '../../services/frindes.service';
import { Suggestion } from '../../models/frindes-data.interface';
import { NgClass } from '@angular/common';
import { FeedPostStateService } from '../../../home/components/feed/services/feed-post-state.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-frind',
  imports: [NgClass, RouterLink],
  templateUrl: './frind.component.html',
  styleUrl: './frind.component.css',
})
export class FrindComponent implements OnInit {
  private readonly frindesService = inject(FrindesService);
  private readonly feedPostStateService = inject(FeedPostStateService);

  @Input({ required: true }) friend!: Suggestion;

  // 🔥 Signal بدل boolean عادي
  isFollowing: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {}

  // 🔥 toggle follow
  toggleFollow(): void {
    this.frindesService.folowUser(this.friend._id).subscribe({
      next: (res) => {
        const newState = res.data.following;

        // update signal
        this.isFollowing.set(newState);

        // update followers count locally
        this.friend.followersCount = res.data.followersCount;

        // sync localStorage

        this.feedPostStateService.getFeedPostData();
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
}
