import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../../../core/services/posts/posts.service';
import { SinglpostComponent } from '../../../../shared/components/singlpost/singlpost.component';
import { FeedPostStateService } from './services/feed-post-state.service';

@Component({
  selector: 'app-feed',
  imports: [SinglpostComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent implements OnInit {
  private readonly feedPostStateService = inject(FeedPostStateService);

  feedPost = this.feedPostStateService.feedPosts;

  ngOnInit(): void {
    this.feedPostStateService.getFeedPostData();
  }
}
