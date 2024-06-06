import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SignInComponent } from './sign-in.component';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent, HomeComponent],
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
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
    control?.setValue('test');

    expect(control?.errors?.['passwordStrength']).toBeTruthy();
  });

  it('should detect matching passwords', () => {
    const passwordControl = component.signInForm.get('password');
    const confirmPasswordControl = component.signInForm.get('confirmPassword');
    passwordControl?.setValue('password123');
    confirmPasswordControl?.setValue('password123');
    expect(component.signInForm.hasError('passwordsMismatch')).toBeFalsy();
  });

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

  it('should generate field errors', () => {
    component.signInForm.get('firstname')?.markAsTouched();
    component.signInForm.get('firstname')?.setValue('');

    const errors = component.getFormFieldErrors('firstname');

    expect(errors).toContain('Le champ firstname est requis.');
  });

  it('should navigate to home page after successful registration', async () => {
    component.signInForm.patchValue({
      lastname: 'Rojas',
      firstname: 'Célia',
      password: 'Password1!',
      confirmPassword: 'Password1!',
      postalCode: '34000'
    });
    // Attendre que les observables asynchrones se stabilisent
    await fixture.whenStable();
    component.validateForm();
    expect(component.signInForm.valid).toBeTruthy();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

});
