import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/types/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  user : IUser
  userUpdateForm : FormGroup
  constructor(
    private userService : UserService
  ) { 
    this.user = {
      firstName: "",
      lastName: "",
      id: "",
      avatarImage: ""
    }
    this.userUpdateForm = new FormGroup({
      firstName : new FormControl(""),
      lastName : new FormControl(""),
      avatarImage : new FormControl("")
    })
  }

  loadBase64FromImage(e : Event) : void {
    let imageData = "";
    var target = e.currentTarget as HTMLInputElement;
    var files = target.files;
    if (FileReader && files && files.length) {
        const fileReader = new FileReader()
        fileReader.onload = () => {
            imageData = fileReader.result!.toString();
            this.userUpdateForm.controls['avatarImage'].setValue(imageData)
            console.log(this.userUpdateForm.value)
        }
        fileReader.readAsDataURL(files[0])
    }
  }

  updateUserProfile() {
    this.userService.updateUserProfile(this.userUpdateForm.value);
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
    })
  }

}
