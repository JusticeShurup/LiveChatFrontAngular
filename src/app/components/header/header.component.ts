import { Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  iconName : String;

  constructor(
    public readonly authService : AuthService
  ) {
    this.iconName = "menu";
  }

  onToggleMenu(event : Event) {
    const navLinks = document.querySelector(".nav-links");
    this.iconName = this.iconName === "menu" ? "close" : "menu";
    navLinks?.classList.toggle('top-[9%]');
    console.log(event.target);
  }
}
