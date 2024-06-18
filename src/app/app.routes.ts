import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { AiHelpComponent } from './pages/ai-help/ai-help.component';
import { AchievementsComponent } from './pages/achievements/achievements.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PlanningProjectComponent } from './pages/planning-project/planning-project.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { IsAuthGuard } from './services/guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CalendarComponent } from './pages/calendar/calendar.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'projects'
  },
  {
    path: 'register',
    component: SignUpComponent
  },
  {
    path: 'login',
    component: SignInComponent
  },
  {
    path: 'projects',
    component: PlanningProjectComponent,
    canActivate: [IsAuthGuard]
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [IsAuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [IsAuthGuard]
  },
  {
    path: 'achievements',
    component: AchievementsComponent,
    canActivate: [IsAuthGuard]
  },
  {
    path: 'ai',
    component: AiHelpComponent,
    canActivate: [IsAuthGuard]
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [IsAuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
