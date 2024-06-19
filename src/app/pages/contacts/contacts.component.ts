import { NgFor, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/types/user.interface';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent  implements OnInit {
  
  constructor(public userService: UserService) { 
  }

  ngOnInit() {
    this.userService.getAllUsers()
    console.log(this.userService.usersSig())
  }


}
