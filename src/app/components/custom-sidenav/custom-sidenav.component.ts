import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { MenuItem } from '../../types/sidenav';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss'
})
export class CustomSidenavComponent {
  sideNavCollapsed = signal(true);
  @Input() set collapsed(val: boolean){
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'edit_note',
      label: 'Мої плани',
      route: 'projects'
    },
    {
      icon: 'calendar_month',
      label: 'Календар',
      route: 'calendar'
    },
    {
      icon: 'person',
      label: 'Профіль',
      route: 'profile'
    },
    {
      icon: 'emoji_events',
      label: 'Досягнення',
      route: 'achievements'
    },
    {
      icon: 'live_help',
      label: 'Бот помічник',
      route: 'ai'
    },
    {
      icon: 'quick_contacts_mail',
      label: 'Зв\'язатися з нами',
      route: 'contact'
    }
  ]);
}
