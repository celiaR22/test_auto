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
      postalCode: ['', [this.frenchPostalCodeValidator()]]
    }, { validators: this.passwordMatchValidator });
  }

  validateForm() {
    if (this.signInForm.valid) {
      const formData = this.getFormData();
      console.log(formData);
    }
  }

  getFormData() {
    return {
      lastname: this.signInForm.get('lastname')?.value,
      firstname: this.signInForm.get('firstname')?.value,
      password: this.signInForm.get('password')?.value,
      postalCode: this.signInForm.get('postalCode')?.value
    };
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
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  frenchPostalCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const postalCodeRegex = /^(?:[0-8]\d|9[0-8])\d{3}$/;
      const isValid = postalCodeRegex.test(control.value);

      return isValid ? null : { invalidPostalCode: true };
    };
  }

  getFormFieldErrors(fieldName: string): string[] {
    const errors: string[] = [];
    const control = this.signInForm.get(fieldName);

    if (!control || !control.touched) {
      return errors;
    }

    if (control.errors) {
      if (control.errors['required']) {
        errors.push(`Le champ ${fieldName} est requis.`);
      }

      if (fieldName === 'confirmPassword' && this.signInForm.hasError('passwordsMismatch')) {
        errors.push('Les mots de passe ne correspondent pas.');
      }

      if (fieldName === 'password' && control.errors['passwordStrength']) {
        errors.push('Le mot de passe doit avoir au moins 8 caractères, une majuscule et un caractère spécial.');
      }

      if (fieldName === 'postalCode' && control.errors['invalidPostalCode']) {
        errors.push('Le code postal n\'est pas valide.');
      }
    }

    return errors;
  }

}
