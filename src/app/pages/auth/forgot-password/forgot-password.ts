import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'appforgot-password',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  private fb = inject(FormBuilder);
  
  forgotPassword: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
  get email() {return this.forgotPassword.get('email')}

  public submited = signal<boolean>(false);
  onSubmit(): void {
    this.submited.set(true);
    if (this.forgotPassword.valid) {
      console.log('------------------------------');
      console.log(this.email?.value);
      this.forgotPassword.reset();
      this.submited.set(false);
    } else {
      this.forgotPassword.markAllAsTouched();
    }
  }
}
