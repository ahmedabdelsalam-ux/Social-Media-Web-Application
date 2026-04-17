import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // AUTH (Lazy)
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./core/auth/components/login/login.component').then((m) => m.LoginComponent),
        title: ' | Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/auth/components/register/register.component').then(
            (m) => m.RegisterComponent,
          ),
        title: ' | Register',
      },
    ],
  },

  // MAIN APP (Protected + Lazy)
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    canActivateChild: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
        title: '| Home',
        children: [
          {
            path: '',
            redirectTo: 'feed',
            pathMatch: 'full',
          },
          {
            path: 'feed',
            loadComponent: () =>
              import('./features/home/components/feed/feed.component').then((m) => m.FeedComponent),
            title: '| Home | Feed',
          },
          {
            path: 'my-posts',
            loadComponent: () =>
              import('./features/home/components/my-posts/my-posts.component').then(
                (m) => m.MyPostsComponent,
              ),
            title: '| Home | My Posts',
          },
          {
            path: 'community',
            loadComponent: () =>
              import('./features/home/components/community/community.component').then(
                (m) => m.CommunityComponent,
              ),
            title: '| Home | Community',
          },
          {
            path: 'saved',
            loadComponent: () =>
              import('./features/home/components/saved/saved.component').then(
                (m) => m.SavedComponent,
              ),
            title: '| Home | Saved',
          },
        ],
      },

      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile.component').then((m) => m.ProfileComponent),
        title: '| Profile ',
      },
      {
        path: 'suggestfriends',
        loadComponent: () =>
          import('./features/suggestfriends/suggestfriends.component').then(
            (m) => m.SuggestfriendsComponent,
          ),
        title: '| Suggest Friends ',
      },
      {
        path: 'changepassword',
        loadComponent: () =>
          import('./features/changepassword/changepassword.component').then(
            (m) => m.ChangepasswordComponent,
          ),
        title: '| Change Password ',
      },
      {
        path: 'user-profile/:id',
        loadComponent: () =>
          import('./features/user-profile/user-profile.component').then(
            (m) => m.UserProfileComponent,
          ),
        title: '| User Profile ',
      },

      // Notifications (nested lazy)
      {
        path: 'notifications',
        loadComponent: () =>
          import('./features/notifications/notifications.component').then(
            (m) => m.NotificationsComponent,
          ),
        title: '| Notifications ',
        children: [
          {
            path: '',
            redirectTo: 'all-notifications',
            pathMatch: 'full',
          },
          {
            path: 'all-notifications',
            loadComponent: () =>
              import('./features/notifications/components/all-notifications/all-notifications.component').then(
                (m) => m.AllNotificationsComponent,
              ),
            title: '| Notifications | All Notifications ',
          },
          {
            path: 'unread-notifications',
            loadComponent: () =>
              import('./features/notifications/components/unread-notifications/unread-notifications.component').then(
                (m) => m.UnreadNotificationsComponent,
              ),
            title: '| Notifications | unread Notifications',
          },
        ],
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
