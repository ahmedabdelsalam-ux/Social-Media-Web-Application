import { isPlatformBrowser } from '@angular/common';
import { LoginauthService } from './../../services/loginauth.service';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly loginauthService = inject(LoginauthService);
  private readonly router = inject(Router);
  private readonly platId = inject(PLATFORM_ID);
  flag: boolean = true;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
    ]),
  });

  submitLoginForm(): void {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.loginauthService.submitLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.success === true) {
            console.log(res);
            if (isPlatformBrowser(this.platId)) {
              localStorage.setItem('usertoken', res.data.token);
              localStorage.setItem('userId', res.data.user._id);
            }
            this.loginForm.reset();

            this.router.navigate(['/home']);
          }
        },
        error: (err) => {
          console.log(err.error);
        },
      });
    }
  }

  showPassword() {
    this.flag = !this.flag;
  }
}
