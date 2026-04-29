import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  get email() {return this.loginForm.get('email')}
  get password() {return this.loginForm.get('password')}

  public RememberUser = signal<boolean>(false);
  toggleRememberMe(): void {
    this.RememberUser.update(v => !v);
  }

  public submited = signal<boolean>(false);
  onSubmit(): void {
    this.submited.set(true);
    if (this.loginForm.valid) {
      console.log('------------------------------');
      console.log(this.email?.value);
      console.log(this.password?.value);
      this.loginForm.reset();
      this.submited.set(false);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
