import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProfileService } from './services/profile.service';
import { User } from './models/profile.interface';
import { TimeagoPipe } from '../../shared/pipes/timeago-pipe';
import { MyPostsComponent } from '../home/components/my-posts/my-posts.component';
import { SavedComponent } from '../home/components/saved/saved.component';
import { ProfileStateService } from './services/profile-state.service';
import { MyPostsService } from '../home/components/my-posts/services/my-posts.service';

@Component({
  selector: 'app-profile',
  imports: [MyPostsComponent, SavedComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly profileStateService = inject(ProfileStateService);
  private readonly profileService = inject(ProfileService);
  private readonly myPostsService = inject(MyPostsService);

  activeTab: 'posts' | 'saved' = 'posts';

  myPostCount = computed(() => this.myPostsService.totalCount());
  profile = this.profileStateService.profileData;

  ngOnInit(): void {
    this.profileStateService.getMyProfileData();
    this.myPostsService.getMyPostData();
  }

  isPhotoModalOpen = false;

  openPhotoModal(): void {
    this.isPhotoModalOpen = true;
  }

  closePhotoModal(): void {
    this.isPhotoModalOpen = false;
  }

  onPhotoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file); // الاسم 'photo' زي ما الـ API بيتوقع

    this.profileService.uploadProfilePhoto(formData).subscribe({
      next: (res) => {
        // لو الـ API بيرجع الـ URL الجديد للصورة، حدّث الـ signal
        if (res?.photoUrl) {
          this.profileStateService.updatePhoto(res.photoUrl);
          this.myPostsService.getMyPostData();
        } else {
          // لو مش بيرجع URL، اعمل preview محلياً
          const reader = new FileReader();
          reader.onload = () => {
            this.profileStateService.updatePhoto(reader.result as string);
            this.myPostsService.getMyPostData();
          };
          reader.readAsDataURL(file);
          this.myPostsService.getMyPostData();
        }
      },
      error: (err) => {
        console.error(err.error);
      },
    });
  }
}
