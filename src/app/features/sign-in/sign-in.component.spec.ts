import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SignInComponent } from './sign-in.component';
import { AppComponent } from 'src/app/app.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [ReactiveFormsModule, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect strong passwords', () => {
    const control = component.signInForm.get('password');
    control?.setValue('StrongPassword1!');

    expect(control?.valid).toBeTruthy();
  });

  it('should detect weak passwords', () => {
    const control = component.signInForm.get('password');
    control?.setValue('weak');

    expect(control?.errors?.['passwordStrength']).toBeTruthy();
  });

  // it('should detect matching passwords', () => {
  //   const passwordControl = component.signInForm.get('password');
  //   const confirmPasswordControl = component.signInForm.get('confirmPassword');
  //   passwordControl?.setValue('password123');
  //   confirmPasswordControl?.setValue('password123');

  //   expect(component.signInForm.valid).toBeTruthy();
  // });

  it('should detect non-matching passwords', () => {
    const passwordControl = component.signInForm.get('password');
    const confirmPasswordControl = component.signInForm.get('confirmPassword');
    passwordControl?.setValue('password123');
    confirmPasswordControl?.setValue('password');

    expect(component.signInForm.hasError('passwordsMismatch')).toBeTruthy();
  });

  it('should detect valid French postal codes', () => {
    const control = component.signInForm.get('postalCode');
    control?.setValue('75001');

    expect(control?.valid).toBeTruthy();
  });

  // it('should detect invalid French postal codes', () => {
  //   const control = component.signInForm.get('postalCode');
  //   control?.setValue('12345');

  //   expect(control?.errors?.['invalidPostalCode']).toBeTruthy();
  // });

  it('should generate field errors', () => {
    component.signInForm.get('firstname')?.markAsTouched();
    component.signInForm.get('firstname')?.setValue('');

    const errors = component.getFormFieldErrors('firstname');

    expect(errors).toContain('Le champ firstname est requis.');
  });

  // it('should return field errors for invalid form fields', () => {
  //   // Ajoutez une valeur invalide au champ lastname
  //   component.signInForm.get('lastname')?.setValue('');
  //   // Appelez la méthode getFormFieldErrors pour le champ lastname
  //   const lastNameErrors = component.getFormFieldErrors('lastname');
  //   // Vérifiez si la méthode retourne le message d'erreur attendu
  //   expect(lastNameErrors).toContain('Le champ lastname est requis.');
  // });
});
