import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonMaterialModule } from '../../common-modules/common-material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { ContactEmail } from '../../models/contact-email';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit{
  form: FormGroup = this.formBuilder.group({})

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private snackBar: MatSnackBar
  ){  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        message: ''
    });
  }


  onSubmit(){
    var email: ContactEmail = {
      message: this.form.value.message
    };

    this.emailService.sendEmail(email).subscribe({
      next: ()=> {
        this.snackBar.open('Письмо відправлено менеджеру', 'OK', {
          duration: 3000
        });
        this.form.get('message')?.setValue('');
      },
      error: (error) => {
        this.snackBar.open('Щось пішло не так', 'OK', {
          duration: 5000
        });
      }
    })
  }
}
