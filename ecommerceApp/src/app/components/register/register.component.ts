import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  isSubmitting = false;

  registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: this.passwordsMatchValidator });

  constructor(private router: Router) {}

  get formControls() {
    return this.registerForm.controls;
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // Simulate API Call delay
    setTimeout(() => {
      this.isSubmitting = false;
      
      Swal.fire({
        icon: 'success',
        title: 'Account Created!',
        text: 'You have registered successfully.',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        this.router.navigate(['/login']); // Redirect to login
      });

    }, 1000); // 1-second delay
  }
}
