import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  HostListener,
  WritableSignal,
  signal,
  computed,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PostsService } from '../../../core/services/posts/posts.service';
import { HomeComponent } from '../../../features/home/home.component';
import { PostStateService } from '../../../core/services/post-state/post-state.service';
import { FeedPostStateService } from '../../../features/home/components/feed/services/feed-post-state.service';
import { MyPostsService } from '../../../features/home/components/my-posts/services/my-posts.service';
import { ProfileStateService } from '../../../features/profile/services/profile-state.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-creatpost',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './creatpost.component.html',
  styleUrl: './creatpost.component.css',
})
export class CreatpostComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly postStateService = inject(PostStateService);
  private readonly feedPostStateService = inject(FeedPostStateService);
  private readonly profileStateService = inject(ProfileStateService);
  private readonly myPostsService = inject(MyPostsService);
  private readonly platId = inject(PLATFORM_ID);

  userPhoto = computed(() => this.profileStateService.profileData()?.photo);
  userName = computed(() => this.profileStateService.profileData()?.name);

  uploadFile: File | null = null;
  // previewUrl: string | null = null;
  previewUrl: WritableSignal<string | null> = signal<string | null>(null);

  showEmojiPicker = false;

  emojis: string[] = [
    '😀',
    '😁',
    '😂',
    '🤣',
    '😃',
    '😄',
    '😅',
    '😆',
    '😇',
    '😉',
    '😊',
    '🙂',
    '🙃',
    '😋',
    '😌',
    '😍',
    '🥰',
    '😘',
    '😗',
    '😙',
    '😚',
    '🤩',
    '🥳',
    '😎',
    '🤓',
    '🧐',
    '😏',
    '😒',
    '😞',
    '😔',
    '😟',
    '😕',
    '🙁',
    '☹️',
    '😣',
    '😖',
    '😫',
    '😩',
    '🥺',
    '😢',
    '😭',
    '😤',
    '😠',
    '😡',
    '🤬',
    '🤯',
    '😳',
    '🥵',
    '😱',
    '😨',
    '😰',
    '😥',
    '😓',
    '🤗',
    '🤭',
    '🤫',
    '🤔',
    '🤐',
    '🤨',
    '😐',
    '😑',
    '😶',
    '😶‍🌫️',
    '😬',
    '🙄',
    '😯',
    '😦',
    '😧',
    '😮',
    '😲',
    '🥱',
    '😴',
    '🤤',
    '😪',
    '😵',
    '🤪',
    '😵‍💫',
    '🤑',
    '🤠',
    '🥸',
    '🥴',
    '🤢',
    '🤮',
    '🤧',
    '😷',
    '🤒',
    '🤕',
    '🤑',
    '👍',
    '👎',
    '👏',
    '🙌',
    '🤝',
    '🙏',
    '✌️',
    '🤞',
    '❤️',
    '🧡',
    '💛',
    '💚',
    '💙',
    '💜',
    '🖤',
    '🤍',
    '🔥',
    '✨',
    '🌟',
    '💫',
    '⭐',
    '🎉',
    '🎊',
    '🎈',
    '😺',
    '😸',
    '😹',
    '😻',
    '😼',
    '😽',
    '🙀',
    '😿',
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platId)) {
      this.profileStateService.getMyProfileData();
    }
  }

  // Close emoji picker when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.showEmojiPicker = false;
    }
  }

  toggleEmojiPicker(): void {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  insertEmoji(emoji: string): void {
    const current: string = this.creatPostContent.value ?? '';
    this.creatPostContent.setValue(current + emoji);
    this.showEmojiPicker = false;
  }

  fileUbloaded(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.uploadFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        this.previewUrl.set(ev.target?.result as string);
      };
      reader.readAsDataURL(this.uploadFile);
    }
  }

  removeImage(): void {
    this.uploadFile = null;
    this.previewUrl.set(null);
  }

  creatPostContent: FormControl = new FormControl('');

  submitAddPost(e: SubmitEvent): void {
    e.preventDefault();

    const body = this.creatPostContent.value?.trim();

    // 🚨 منع البوست الفاضي
    if (!body && !this.uploadFile) {
      alert('Post cannot be empty');
      return;
    }

    const formData: FormData = new FormData();

    // 👇 مهم: متبعتش null أو ""
    if (body) {
      formData.append('body', body);
    }

    if (this.uploadFile) {
      formData.append('image', this.uploadFile);
    }

    this.postsService.creatPost(formData).subscribe({
      next: (res) => {
        if (res.success == true) {
          this.postStateService.getAllPostsData();
          this.feedPostStateService.getFeedPostData();
          this.myPostsService.getMyPostData();
        }
      },
      error: (err) => {
        console.log(err.error);
      },
    });

    this.creatPostContent.reset();
    this.uploadFile = null;
    this.previewUrl.set(null);
    this.showEmojiPicker = false;
  }
}
