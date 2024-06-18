import { Component, Input, OnInit } from '@angular/core';
import { CommonMaterialModule } from '../../common-modules/common-material.module';
import { AchievementService } from '../../services/achievement.service';
import { Achievement } from '../../models/achievement';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule, CommonMaterialModule],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss'
})
export class AchievementsComponent implements OnInit{
  achievements: Achievement[] = [];
  @Input() userScore: number = 0;
  @Input() showUncompleted: boolean = true;

  constructor(
    private achievementService: AchievementService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    if(this.userScore === 0){
      this.fetchUserScore();
    }

    this.fetchAchievements();
  }

  private fetchAchievements(){
    this.achievementService.getAll()
    .subscribe({
        next: (response: Achievement[]) => {
          if(this.showUncompleted){
            this.achievements = response;
          }
          else{
            this.achievements = response.filter(achievement =>
              achievement.scores <= this.userScore);
          }
        },
        error: (error) => {
          this.snackBar.open('Щось пішло не так', 'OK', {
            duration: 5000
          });
        }
    });
  }

  private fetchUserScore() {
    this.userService.getUser()
    .subscribe({
        next: (response: User) => {
          this.userScore = response.completedTasks;
        },
        error: (error) => {
          this.snackBar.open('Щось пішло не так', 'OK', {
            duration: 5000
          });
        }
    });
  }

  get showTitle(): boolean {
    return this.showUncompleted;
  }

  getCurrentScore(achievementScore: number): number {
    if(this.userScore <= achievementScore){
      return this.userScore;
    }

    return achievementScore;
  }

  isActive(achievementScore: number): boolean {
    return this.userScore >= achievementScore;
  }
}
