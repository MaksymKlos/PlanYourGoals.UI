import { Component, OnInit } from '@angular/core';
import { CommonMaterialModule } from '../../common-modules/common-material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthResponse, Register } from '../../models/authentication';
import { AuthenticationService } from '../../services/authentication.service';
import { authentication } from '../../types/constants/authentication';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validateNoSpaces, validateOnlySpaces } from '../../helpers/validators/general-validators';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit{
  form: FormGroup = this.formBuilder.group({});
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    if(this.service.isAuthenticated()){
      this.router.navigateByUrl('');
    }

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, validateOnlySpaces(), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: ['', [Validators.required, validateNoSpaces(), Validators.minLength(8), Validators.maxLength(50)]]
    })
  }

  register(): void{
    const registerModel: Register = {
      name: this.form.value.name!,
      email: this.form.value.email!,
      password: this.form.value.password!,
    }

    this.service.register(registerModel).subscribe({
      next: (response) => {
        localStorage.setItem(authentication.token, response.token);
        this.service.isAuthenticated.set(true);
        this.router.navigateByUrl('')
      },
      error: (error) => {
        this.snackBar.open('Щось пішло не так', 'OK', {
          duration: 5000
        });
      }
    });
  }

  redirectToLogin(): void {
    this.router.navigateByUrl('login')
  }
}
