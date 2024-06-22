import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { FormControl, FormGroup, NgModel } from '@angular/forms';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {

  messageData : FormGroup
  constructor(public readonly chatService : ChatService) {
    this.messageData = new FormGroup({
      messageText : new FormControl("", []),
    })
   }
  
  sendMessage() {
    this.chatService.hubConnection?.send("SendToOthers", this.messageData.get('messageText')?.value).then((res)=>{
      console.log(res)
    }, err => {
      console.log(err)
    })
    this.messageData.get("messageText")?.reset();
  }

  ngOnInit() {
    this.chatService.startConnection();
    console.log(this.chatService.messagesSig())
  }
  
  ngOnDestroy(): void {
    this.chatService.closeConnection();
  }

}
