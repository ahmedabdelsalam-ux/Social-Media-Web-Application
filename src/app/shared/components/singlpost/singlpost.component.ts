import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';

import { CommentsService } from '../../../core/services/comments/comments.service';
import { FlowbiteService } from '../../../core/services/flobite/flobite';
import { PostStateService } from '../../../core/services/post-state/post-state.service';
import { PostsService } from '../../../core/services/posts/posts.service';
import { FeedPostStateService } from '../../../features/home/components/feed/services/feed-post-state.service';
import { MyPostsService } from '../../../features/home/components/my-posts/services/my-posts.service';
import { SavedPostStateService } from '../../../features/home/components/saved/services/saved-post-state.service';
import { ProfileStateService } from '../../../features/profile/services/profile-state.service';

import { TimeagoPipe } from '../../pipes/timeago-pipe';
import { CommentsComponent } from '../comments/comments.component';
import { Comment } from '../comments/models/comments.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-singlpost',
  imports: [TimeagoPipe, CommentsComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './singlpost.component.html',
  styleUrl: './singlpost.component.css',
})
export class SinglpostComponent implements OnInit {
  // ─── Services ───────────────────────────────────────────────────────────────
  private readonly postsService = inject(PostsService);
  private readonly commentsService = inject(CommentsService);
  private readonly postStateService = inject(PostStateService);
  private readonly savedPostStateService = inject(SavedPostStateService);
  private readonly feedPostStateService = inject(FeedPostStateService);
  private readonly myPostsService = inject(MyPostsService);
  private readonly profileStateService = inject(ProfileStateService);
  private readonly platId = inject(PLATFORM_ID);

  // ─── Inputs ─────────────────────────────────────────────────────────────────
  postId = input.required<string>();
  postData = input.required<any>();

  // ─── State signals ──────────────────────────────────────────────────────────
  isLiked = signal<boolean>(false);
  isBookmarked = signal<boolean>(false);
  isLikesModalOpen = signal<boolean>(false);
  showAllComments = signal<boolean>(false);
  showImageModal = signal<boolean>(false);
  showShareModal = signal<boolean>(false);
  showEditMode = signal<boolean>(false);
  editPreviewUrl = signal<string | null>(null);

  commentList = signal<Comment[]>([]);
  likeList = signal<any>({ likes: [] });

  // ─── Non-signal state ────────────────────────────────────────────────────────
  flag = false;
  logedUserId = localStorage.getItem('userId');
  editUploadFile: File | null = null;

  // ─── Form controls ───────────────────────────────────────────────────────────
  shareContent = new FormControl('');
  editContent = new FormControl('');

  // ─── View refs ───────────────────────────────────────────────────────────────
  @ViewChild('dropDown') dropDown!: ElementRef<HTMLElement>;

  // ─── Constructor / effects ───────────────────────────────────────────────────
  constructor(private flowbiteService: FlowbiteService) {
    effect(() => {
      this.isBookmarked.set(this.postData().bookmarked);
    });

    effect(() => {
      const id = this.postId();
      if (id) this.getAllPostComments();
    });

    effect(() => {
      const post = this.postData();
      const userId = this.logedUserId;
      this.isLiked.set(post.likes.includes(userId!));
    });
  }

  // ─── Lifecycle ───────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => initFlowbite());
  }

  // ─── Comments ────────────────────────────────────────────────────────────────
  getAllPostComments(): void {
    this.commentsService.getPostComment(this.postId()).subscribe({
      next: (res) => {
        if (res.success) this.commentList.set(res.data.comments);
      },
      error: (err) => console.log(err.error),
    });
  }

  onCommentBtnClick(): void {
    this.showAllComments.set(true);
  }

  // ─── Dropdown ────────────────────────────────────────────────────────────────
  openDropdownMenue(): void {
    this.flag = !this.flag;
  }
  closeDropdown(): void {
    this.flag = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.dropDown && !this.dropDown.nativeElement.contains(event.target as Node)) {
      this.closeDropdown();
    }
  }

  // ─── Image modal ─────────────────────────────────────────────────────────────
  openImageModal(): void {
    this.showImageModal.set(true);
    if (isPlatformBrowser(this.platId)) document.body.style.overflow = 'hidden';
  }

  closeImageModal(): void {
    this.showImageModal.set(false);
    if (isPlatformBrowser(this.platId)) document.body.style.overflow = '';
  }

  // ─── Post actions ────────────────────────────────────────────────────────────
  deletMyPost(): void {
    this.postsService.deletPost(this.postId()).subscribe({
      next: (res) => {
        if (res.success) {
          this.postStateService.getAllPostsData();
          this.savedPostStateService.getSavedPostData();
          this.feedPostStateService.getFeedPostData();
          this.myPostsService.getMyPostData();
          this.profileStateService.getMyProfileData();
        }
      },
      error: (err) => console.log(err.error),
    });
  }

  savePosts(): void {
    this.postsService.savePost(this.postId()).subscribe({
      next: (res) => {
        if (res.success) {
          this.isBookmarked.update((val) => !val);
          this.savedPostStateService.getSavedPostData();
          this.profileStateService.getMyProfileData();
        }
      },
      error: (err) => console.log(err.error),
    });
  }

  toggleLike(): void {
    this.postsService.likePost(this.postId()).subscribe({
      next: (res) => {
        if (res.success) {
          this.isLiked.update((liked) => !liked);
          this.postStateService.getAllPostsData();
          this.savedPostStateService.getSavedPostData();
          this.feedPostStateService.getFeedPostData();
          this.myPostsService.getMyPostData();
        }
      },
      error: (err) => console.log(err.error),
    });
  }

  // ─── Likes modal ─────────────────────────────────────────────────────────────
  getAllPostLikes(): void {
    if (this.postData().likesCount === 0) return;

    this.likeList.set({ likes: [] });
    this.postsService.getPostLikes(this.postId()).subscribe({
      next: (res) => {
        if (res.success) {
          this.likeList.set(res.data);
          this.isLikesModalOpen.set(true);
          if (isPlatformBrowser(this.platId)) document.body.style.overflow = 'hidden';
        }
      },
      error: (err) => console.log(err.error),
    });
  }

  closeLikesModal(): void {
    this.isLikesModalOpen.set(false);
    if (isPlatformBrowser(this.platId)) document.body.style.overflow = '';
  }

  // ─── Share modal ─────────────────────────────────────────────────────────────
  openShareModal(): void {
    this.showShareModal.set(true);
    if (isPlatformBrowser(this.platId)) document.body.style.overflow = 'hidden';
  }

  closeShareModal(): void {
    this.showShareModal.set(false);
    document.body.style.overflow = '';
    this.shareContent.reset();
  }

  sharePost(): void {
    this.postsService
      .sharePost(this.postId(), { body: this.shareContent.value || undefined })
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.closeShareModal();
            this.postStateService.getAllPostsData();
            this.feedPostStateService.getFeedPostData();
            this.myPostsService.getMyPostData();
          }
        },
        error: (err) => console.log(err.error),
      });
  }

  // ─── Edit mode ───────────────────────────────────────────────────────────────
  openEditMode(): void {
    this.editContent.setValue(this.postData().body);
    this.editPreviewUrl.set(this.postData().image ?? null);
    this.showEditMode.set(true);
    this.flag = false;
  }

  closeEditMode(): void {
    this.showEditMode.set(false);
    this.editContent.reset();
    this.editUploadFile = null;
    this.editPreviewUrl.set(null);
  }

  editFileUploaded(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (!input?.files?.length) return;

    this.editUploadFile = input.files[0];
    const reader = new FileReader();
    reader.onload = (ev) => this.editPreviewUrl.set(ev.target?.result as string);
    reader.readAsDataURL(this.editUploadFile);
  }

  removeEditImage(): void {
    this.editUploadFile = null;
    this.editPreviewUrl.set(null);
  }

  submitEditPost(): void {
    const formData = new FormData();
    formData.append('body', this.editContent.value!);
    if (this.editUploadFile) formData.append('image', this.editUploadFile);

    this.postsService.editPost(this.postId(), formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.closeEditMode();
          this.postStateService.getAllPostsData();
          this.feedPostStateService.getFeedPostData();
          this.savedPostStateService.getSavedPostData();
          this.myPostsService.getMyPostData();
        }
      },
      error: (err) => console.log(err.error),
    });
  }
}
