import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { ProfileStateService } from '../../../features/profile/services/profile-state.service';
import { PostStateService } from '../../services/post-state/post-state.service';
import { LogOutService } from '../../auth/services/log-out.service';
import { NotificationService } from '../../../features/notifications/services/notification.service';
import { NotificationStateService } from '../../../features/notifications/services/notification-state.service';

interface User {
  name: string;
  email: string;
  avatar: string;
}

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent implements OnInit {
  private readonly platId = inject(PLATFORM_ID);
  private readonly profileStateService = inject(ProfileStateService);
  private readonly notificationStateService = inject(NotificationStateService);
  private readonly logOutService = inject(LogOutService);

  /** Whether the profile dropdown is visible */
  isOpen = false;

  unreadCount = computed(() => this.notificationStateService.unreadCount());

  userPhoto = computed(() => this.profileStateService.profileData()?.photo);
  userName = computed(() => this.profileStateService.profileData()?.name);
  userEmail = computed(() => this.profileStateService.profileData()?.email);

  /** Reference to the wrapper div — used for click-outside detection */
  @ViewChild('profileArea') profileArea!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platId)) {
      this.profileStateService.getMyProfileData();
      this.notificationStateService.loadUnreadCount();
    }
  }

  /** Open / close the dropdown */
  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  /** Close the dropdown */
  closeDropdown(): void {
    this.isOpen = false;
  }

  /** Navigate to change-password page */
  changePassword(): void {
    this.closeDropdown();
    // this.router.navigate(['/change-password']);
  }

  /** Sign the user out */
  signOut(): void {
    this.closeDropdown();
    this.logOutService.userLogOut();
  }

  /** Close dropdown when clicking anywhere outside the profile area */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.profileArea && !this.profileArea.nativeElement.contains(event.target as Node)) {
      this.closeDropdown();
    }
  }
}
