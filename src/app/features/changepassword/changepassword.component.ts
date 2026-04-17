import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangPasswordService } from './services/chang-password.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-changepassword',
  imports: [ReactiveFormsModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css',
})
export class ChangepasswordComponent {
  private readonly changPasswordService = inject(ChangPasswordService);
  private readonly plaId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  errorMessege: WritableSignal<string> = signal('');

  changePasswordForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
    ]),
  });
  submitChangePassword(): void {
    if (this.changePasswordForm.valid) {
      this.changPasswordService.changePassword(this.changePasswordForm.value).subscribe({
        next: (res) => {
          if (res.success === true) {
            if (isPlatformBrowser(this.plaId)) {
              localStorage.removeItem('usertoken');
              localStorage.setItem('usertoken', res.data.token);
              this.changePasswordForm.reset();
              this.router.navigate(['/home/feed']);
              this.errorMessege.set('');
              console.log(res);
            }
          }
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessege.set(err.error.message);
          this.changePasswordForm.reset();
        },
      });
    }
  }
}
