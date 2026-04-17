import { Component, inject, OnInit } from '@angular/core';
import { PostStateService } from '../../../../core/services/post-state/post-state.service';
import { SinglpostComponent } from '../../../../shared/components/singlpost/singlpost.component';

@Component({
  selector: 'app-community',
  imports: [SinglpostComponent],
  templateUrl: './community.component.html',
  styleUrl: './community.component.css',
})
export class CommunityComponent implements OnInit {
  private readonly postStateService = inject(PostStateService);

  posts = this.postStateService.AllPosts;

  ngOnInit(): void {
    this.postStateService.getAllPostsData();
  }
}
