import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonMaterialModule } from '../../common-modules/common-material.module';
import { AuthResponse, Login } from '../../models/authentication';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { authentication } from '../../types/constants/authentication';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validateNoSpaces } from '../../helpers/validators/general-validators';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, validateNoSpaces()]]
    })
  }

  login(): void{
    const loginModel: Login = {
      email: this.form.value.email!,
      password: this.form.value.password!
    }

    this.service.login(loginModel).subscribe({
      next: (response: AuthResponse) => {
        debugger;
        if(response.result){
          localStorage.setItem(authentication.token, response.token);
          this.service.isAuthenticated.set(true);
          this.router.navigateByUrl('')
        }
      },
      error: (error:AuthResponse) => {
        if(!error.result){
          this.snackBar.open('Неправильний логін або пароль!', 'OK', {
            duration: 5000
          });
        }
      }
    });
  }

  redirectToRegister(){
    this.router.navigateByUrl('register');
  }
}
