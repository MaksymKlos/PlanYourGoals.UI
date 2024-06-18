import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CustomSidenavComponent } from "./components/custom-sidenav/custom-sidenav.component";
import { CommonMaterialModule } from './common-modules/common-material.module';
import { PlanningProjectModule } from './pages/planning-project/planning-project.module';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthenticationService } from './services/authentication.service';
import { CalendarModule } from './pages/calendar/calendar.module';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
      CommonModule,
      RouterOutlet,
      CommonMaterialModule,
      CustomSidenavComponent,
      SignInComponent,
      SignUpComponent,
      PlanningProjectModule,
      CalendarModule
  ]
})
export class AppComponent{
  title = 'PlanYourGoals.UI';
  collapsed = signal(true);
  authService = inject(AuthenticationService);
  sidenavWidth = computed(() => this.collapsed() ? '60px' : '250px');
}
