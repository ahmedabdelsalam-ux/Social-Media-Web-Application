import { Comment as Singelcomment } from './models/singelcomment.interface';
import {
  Component,
  computed,
  HostListener,
  inject,
  Input,
  OnInit,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { Comment as CommentsList } from './models/comments.interface';
import { TimeagoPipe } from '../../pipes/timeago-pipe';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from '../../../features/home/home.component';
import { Likecomment } from './models/likecomment.interface';
import { PostStateService } from '../../../core/services/post-state/post-state.service';
import { SavedPostStateService } from '../../../features/home/components/saved/services/saved-post-state.service';
import { FeedPostStateService } from '../../../features/home/components/feed/services/feed-post-state.service';
import { MyPostsService } from '../../../features/home/components/my-posts/services/my-posts.service';
import { ProfileStateService } from '../../../features/profile/services/profile-state.service';
import { RouterLink } from '@angular/router';

interface Reply {
  _id: string;
  content: string;
  image?: string;
  createdAt: string;
  commentCreator: {
    _id: string;
    name: string;
    photo: string;
  };
}

@Component({
  selector: 'app-comments',
  imports: [TimeagoPipe, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  private readonly commentsService = inject(CommentsService);
  private readonly postStateService = inject(PostStateService);
  private readonly savedPostStateService = inject(SavedPostStateService);
  private readonly feedPostStateService = inject(FeedPostStateService);
  private readonly myPostsService = inject(MyPostsService);
  private readonly profileStateService = inject(ProfileStateService);

  logedUserId = localStorage.getItem('userId');
  userPhoto = computed(() => this.profileStateService.profileData()?.photo);
  showImageModal = signal<boolean>(false);
  selectedImage: string | null = null;

  @Input() postId!: string;

  dispalyCommnt: WritableSignal<Singelcomment> = signal<Singelcomment>({} as Singelcomment);
  commentContent: FormControl = new FormControl(null);
  imageFile: File | null = null;

  commentAdded = output<void>();
  commentList: WritableSignal<CommentsList[]> = signal<CommentsList[]>([]);
  likeCommnet: WritableSignal<Likecomment> = signal<Likecomment>({} as Likecomment);

  // ====== Comment Image — Signal ======
  previewImage = signal<string | null>(null);

  uploadfile(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => this.previewImage.set(reader.result as string);
      reader.readAsDataURL(this.imageFile);
    }
  }

  removeSelectedImage(): void {
    this.imageFile = null;
    this.previewImage.set(null);
  }

  // ====== Replies State ======
  repliesMap = signal<Record<string, Reply[]>>({});
  openRepliesCommentId: string | null = null;
  replyControls: Record<string, FormControl> = {};
  repliesLoading = signal<Record<string, boolean>>({});

  // ── Reply Image — Signal ──
  replyImageMap = signal<Record<string, { file: File | null; preview: string | null }>>({});

  ngOnInit(): void {
    this.getAllPostComments();
  }

  getAllPostComments(): void {
    this.commentsService.getPostComment(this.postId).subscribe({
      next: (res) => {
        if (res.success) {
          this.commentList.set(res.data.comments);
          this.postStateService.getAllPostsData();
          this.savedPostStateService.getSavedPostData();
          this.feedPostStateService.getFeedPostData();
          this.myPostsService.getMyPostData();
        }
      },
      error: (err) => console.log(err.error),
    });
  }

  submitComment(e: SubmitEvent): void {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', this.commentContent.value || '');
    if (this.imageFile) formData.append('image', this.imageFile);

    this.commentsService.creatComment(this.postId, formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.dispalyCommnt.set(res.data.comment);
          this.getAllPostComments();
          this.commentContent.reset();
          this.removeSelectedImage();
        }
      },
      error: (err) => console.log(err.error),
    });
  }

  // ====== Dropdown & Edit ======
  activeCommentId: string | null = null;
  activeEditCommentId: string | null = null;
  editContent: string = '';
  editImageFile: File | null = null;
  editPreviewImage = signal<string | null>(null);

  toggleDropdown(commentId: string, event: MouseEvent): void {
    event.stopPropagation();
    this.activeCommentId = this.activeCommentId === commentId ? null : commentId;
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.activeCommentId = null;
  }

  startEdit(comment: CommentsList) {
    this.activeEditCommentId = comment._id;
    this.editContent = comment.content;
    this.editPreviewImage.set(comment.image || null);
    this.editImageFile = null;
  }

  cancelEdit() {
    this.activeEditCommentId = null;
    this.editContent = '';
    this.editPreviewImage.set(null);
    this.editImageFile = null;
  }

  uploadEditFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.editImageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => this.editPreviewImage.set(reader.result as string);
      reader.readAsDataURL(this.editImageFile);
    }
  }

  removeEditImage() {
    this.editImageFile = null;
    this.editPreviewImage.set(null);
  }

  saveComment(commentId: string) {
    if (!this.editContent.trim() && !this.editPreviewImage()) return;

    const formData = new FormData();
    formData.append('content', this.editContent);
    if (this.editImageFile) formData.append('image', this.editImageFile);

    this.commentsService.updateComment(this.postId, commentId, formData).subscribe({
      next: () => {
        const updatedComments = this.commentList().map((c) => {
          if (c._id === commentId) {
            c.content = this.editContent;
            c.image = this.editPreviewImage()!;
          }
          return c;
        });
        this.commentList.set(updatedComments);
        this.cancelEdit();
      },
      error: (err) => console.log(err),
    });
  }

  removeComment(commentId: string) {
    this.commentsService.deletComemnt(this.postId, commentId).subscribe({
      next: (res) => {
        if (res.success) this.getAllPostComments();
      },
      error: (err) => console.log(err.error),
    });
  }

  openImageModal(image: string) {
    this.selectedImage = image;
    this.showImageModal.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeImageModal() {
    this.selectedImage = null;
    this.showImageModal.set(false);
    document.body.style.overflow = '';
  }

  // ====== Replies Logic ======
  toggleReplies(commentId: string): void {
    if (this.openRepliesCommentId === commentId) {
      this.openRepliesCommentId = null;
      return;
    }

    this.openRepliesCommentId = commentId;

    if (!this.replyControls[commentId]) {
      this.replyControls[commentId] = new FormControl('');
    }

    if (!this.replyImageMap()[commentId]) {
      this.replyImageMap.update((prev) => ({
        ...prev,
        [commentId]: { file: null, preview: null },
      }));
    }

    this.fetchReplies(commentId);
  }

  fetchReplies(commentId: string): void {
    this.repliesLoading.update((prev) => ({ ...prev, [commentId]: true }));

    this.commentsService.getCommentReplies(this.postId, commentId).subscribe({
      next: (res) => {
        if (res.success) {
          const safeReplies = (res.data.replies as Reply[]).filter(
            (r) => r?.commentCreator != null,
          );
          this.repliesMap.update((prev) => ({ ...prev, [commentId]: safeReplies }));
        }
        this.repliesLoading.update((prev) => ({ ...prev, [commentId]: false }));
      },
      error: (err) => {
        console.log(err);
        this.repliesLoading.update((prev) => ({ ...prev, [commentId]: false }));
      },
    });
  }

  getReplies(commentId: string): Reply[] {
    return this.repliesMap()[commentId] ?? [];
  }

  isRepliesLoading(commentId: string): boolean {
    return this.repliesLoading()[commentId] ?? false;
  }

  // ====== Reply Image Helpers ======
  uploadReplyImage(commentId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.replyImageMap.update((prev) => ({
          ...prev,
          [commentId]: { file, preview: reader.result as string },
        }));
      };
      reader.readAsDataURL(file);
    }
  }

  removeReplyImage(commentId: string): void {
    this.replyImageMap.update((prev) => ({
      ...prev,
      [commentId]: { file: null, preview: null },
    }));
  }

  getReplyPreview(commentId: string): string | null {
    return this.replyImageMap()[commentId]?.preview ?? null;
  }

  // ====== Submit Reply ======
  submitReply(commentId: string): void {
    const control = this.replyControls[commentId];
    const content = control?.value?.trim();
    const imageFile = this.replyImageMap()[commentId]?.file;

    if (!content && !imageFile) return;

    const formData = new FormData();
    formData.append('content', content || '');
    if (imageFile) formData.append('image', imageFile);

    this.commentsService.creatReply(this.postId, commentId, formData).subscribe({
      next: (res) => {
        if (res.success) {
          // أضف الـ reply محلياً

          // ✅ زود الـ repliesCount في commentList مباشرة عشان الـ badge يتحدث
          this.commentList.update((prev) =>
            prev.map((c) => (c._id === commentId ? { ...c, repliesCount: c.repliesCount + 1 } : c)),
          );

          this.fetchReplies(commentId);

          control.reset();
          this.removeReplyImage(commentId);
        }
      },
      error: (err) => console.log(err),
    });
  }

  toggleLike(commentId: string): void {
    const comment = this.commentList().find((c) => c._id === commentId);
    if (!comment) return;

    const liked = comment.likes.includes(this.logedUserId!);

    // عمل request للسيرفر
    this.commentsService.likeComment(this.postId, commentId).subscribe({
      next: (res) => {
        if (res.success) {
          // حدث الـ likes محليًا
          this.commentList.update((prev) =>
            prev.map((c) => {
              if (c._id === commentId) {
                c.likes = liked
                  ? c.likes.filter((id) => id !== this.logedUserId) // undo like
                  : [...c.likes, this.logedUserId!]; // add like
              }
              return c;
            }),
          );
        }
      },
      error: (err) => console.log(err.error),
    });
  }
}
