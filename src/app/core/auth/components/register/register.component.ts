import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterauthService } from '../../services/registerauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly registerauthService = inject(RegisterauthService);
  private readonly router = inject(Router);

  passwordFlag: boolean = true;
  rePasswordFlag: boolean = true;

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
      ]),
      username: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-z0-9_]{3,30}$/),
      ]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
    },
    { validators: this.handelConfirmPassword },
  );

  submitRegisterForm(): void {
    if (this.registerForm.valid) {
      this.registerauthService.submitRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.success === true) {
            this.registerForm.reset();
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 250);
          }
        },
        error: (err) => {
          console.log(err.error);
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  handelConfirmPassword(groub: AbstractControl) {
    const password = groub.get('password')?.value;
    const rePassword = groub.get('rePassword')?.value;

    if (password !== rePassword && rePassword !== '') {
      groub.get('rePassword')?.setErrors({ mismatch: true });

      return { mismatch: true };
    } else {
      return null;
    }
  }

  showPassword(): void {
    this.passwordFlag = !this.passwordFlag;
  }
  showRePassword(): void {
    this.rePasswordFlag = !this.rePasswordFlag;
  }
}
