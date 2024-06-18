import { Component, OnInit } from '@angular/core';
import { CommonMaterialModule } from '../../common-modules/common-material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AchievementsComponent } from '../achievements/achievements.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validateOnlySpaces } from '../../helpers/validators/general-validators';
import { authentication } from '../../types/constants/authentication';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonMaterialModule,
    ReactiveFormsModule,
    CommonModule,
    AchievementsComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user!: User;
  edit: boolean = false;
  form: FormGroup = this.formBuilder.group({});

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private service: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUser()
    .subscribe({
      next: (response: User) => {
        this.user = response;
        this.form = this.createForm();
      },
      error: (error) => {
        this.snackBar.open('Щось пішло не так', 'OK', {
          duration: 5000
        });
      }
    });
  }

  private createForm(): FormGroup{
    return this.formBuilder.group({
      name: [this.user.name, [Validators.required, validateOnlySpaces(), Validators.maxLength(50)]]
    })
  }

  changeEdit(){
    this.edit = !this.edit;
  }

  saveProfile() {
    var updateUser: User = {
      id: this.user.id,
      name: this.form.value.name,
      email: this.user.email,
      completedTasks: this.user.completedTasks
    };

    this.userService.updateUser(updateUser)
    .subscribe({
      next: (response: User) => {
        if(response){
          this.user.name = response.name;
          this.edit = false;
        }
      },
      error: (error) => {
        this.snackBar.open('Щось пішло не так', 'OK', {
          duration: 5000
        });
      }
    });
  }

  logout() {
    localStorage.setItem(authentication.token, '');
    this.service.isAuthenticated.set(false);
    this.router.navigateByUrl('/login');
  }
}
