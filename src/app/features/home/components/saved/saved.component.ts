import { Component, inject, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../../../core/services/posts/posts.service';
import { SinglpostComponent } from '../../../../shared/components/singlpost/singlpost.component';
import { SavedPostStateService } from './services/saved-post-state.service';

@Component({
  selector: 'app-saved',
  imports: [SinglpostComponent],
  templateUrl: './saved.component.html',
  styleUrl: './saved.component.css',
})
export class SavedComponent {
  private readonly savedPostStateService = inject(SavedPostStateService);

  savedPost = this.savedPostStateService.savedPosts;

  ngOnInit(): void {
    this.savedPostStateService.getSavedPostData();
  }
}
