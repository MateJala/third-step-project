import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

function passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value || '';
  const errors: ValidationErrors = {};

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) errors['noSpecialChar'] = true;
  if (!/[0-9]/.test(value))                   errors['noDigit'] = true;
  if (!/[A-Z]/.test(value))                   errors['noUppercase'] = true;

  return Object.keys(errors).length ? errors : null;
}

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private fb = inject(FormBuilder);
  
  RegisterForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), passwordStrengthValidator]],
  });
  get firstName() {return this.RegisterForm.get('firstName')}
  get lastName() {return this.RegisterForm.get('lastName')}
  get email() {return this.RegisterForm.get('email')}
  get password() {return this.RegisterForm.get('password')}

  

  public submited = signal<boolean>(false);
  onSubmit(): void {
    this.submited.set(true);
    if (this.RegisterForm.valid) {
      console.log('----------VALID-----------');
      console.log(this.firstName?.value);
      console.log(this.lastName?.value);
      console.log(this.email?.value);
      console.log(this.password?.value);
      this.RegisterForm.reset();
      this.submited.set(false);
    } else {
      //alerts needed
      console.log('--------ERRORS----------');
      Object.keys(this.RegisterForm.controls).forEach(key => {
        const errors = this.RegisterForm.get(key)?.errors;
        if (errors) console.log(`${key}:`, errors);
      });
    }
  }
}
