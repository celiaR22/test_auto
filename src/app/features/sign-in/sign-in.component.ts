import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup
  hidePassword: boolean = true;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
  }
  resetValueOnClik(controlName: string) {
    this.signInForm?.get(controlName)?.reset();
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  createForm() {
    this.signInForm = this.fb.group({
      lastname: ['', [Validators.required]],
      firstname: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.customPasswordValidator()]],
      confirmPassword: ['', [Validators.required]],
      postalCode: ['']
    }, { validators: this.passwordMatchValidator });
  }

  validateForm() {
    console.log('test');
  }

  customPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]/.test(value);
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const hasMinLength = value.length >= 8;

      const passwordValid = hasUpperCase && hasSpecialCharacter && hasMinLength;

      return !passwordValid ? { passwordStrength: true } : null;
    };
  }

  passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {

    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    console.log(password === confirmPassword ? null : { passwordsMismatch: true });

    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
}
