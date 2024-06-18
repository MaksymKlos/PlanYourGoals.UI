import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { NotFoundComponent } from '../not-found/not-found.component';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from '../../common-modules/common-material.module';
import { FormsModule } from '@angular/forms';
import { BotService } from '../../services/bot.service';
import { BotRequest, BotResponse } from '../../models/bot';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ai-help',
  standalone: true,
  imports: [CommonModule, CommonMaterialModule, FormsModule],
  templateUrl: './ai-help.component.html',
  styleUrl: './ai-help.component.scss'
})
export class AiHelpComponent implements OnInit{
  messages: { text: string, fromUser: boolean }[] = [];
  newMessage: string = '';
  isLoading: boolean = false;
  modelName: string = "gpt-3.5-turbo";

  @ViewChildren('chatContainer') chatContainer?: QueryList<ElementRef>;

  constructor(
    private renderer: Renderer2,
    private botService: BotService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.messages.push({text: 'Бот: ' + 'Вітаю, я відповім на будь-які ваші питання, які стосуються планування.', fromUser:false})
  }

  private scrollToBottom(): void {
    if(this.chatContainer){
      setTimeout(() => {
        const chatContainerElements = this.chatContainer!.toArray();
        const lastChatContainerElement = chatContainerElements[chatContainerElements.length - 1];
        if (lastChatContainerElement) {
          this.renderer.setProperty(
            lastChatContainerElement.nativeElement,
            'scrollTop',
            lastChatContainerElement.nativeElement.scrollHeight
          );
        }
      }, 100);
    }
  }

  sendMessage(): void {
    if (this.newMessage.trim() === '') return;

    this.messages.push({text: 'Ви: ' + this.newMessage, fromUser:true});
    this.scrollToBottom();

    this.isLoading = true;

    var request: BotRequest = {
      botModelName: this.modelName,
      message: this.newMessage
    }

    this.botService.sendMessage(request).subscribe({
      next: (response: BotResponse) =>{
        console.log(response);
        this.isLoading = false;
        this.messages.push({text: "Bot: " + response.botMessage, fromUser:false});
        this.newMessage = '';
      },
      error: (error) => {
        this.snackBar.open('Щось пішло не так', 'OK', {
          duration: 5000
        });
      }
    });
  }
}
