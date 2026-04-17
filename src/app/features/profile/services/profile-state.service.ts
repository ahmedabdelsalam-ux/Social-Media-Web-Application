import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ProfileService } from './profile.service';
import { User } from '../models/profile.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ProfileStateService {
  private readonly profileService = inject(ProfileService);
  private readonly platId = inject(PLATFORM_ID);

  profileData: WritableSignal<User> = signal<User>({} as User);

  getMyProfileData(): void {
    if (isPlatformBrowser(this.platId)) {
      if (localStorage.getItem('usertoken')) {
        this.profileService.getMyProfile().subscribe({
          next: (res) => {
            if (res.success === true) {
              this.profileData.set(res.data.user);
            }
          },
          error: (err) => {
            console.log(err.error);
          },
        });
      }
    }
  }

  updatePhoto(newPhotoUrl: string): void {
    this.profileData.update((profile) => ({
      ...profile,
      photo: newPhotoUrl,
    }));
  }
}
