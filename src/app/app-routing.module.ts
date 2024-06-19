import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChatComponent } from './pages/chat/chat.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { ContactsComponent } from './pages/contacts/contacts.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard()]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard()]
  },
  {
    path: "chat",
    component: ChatComponent,
    canActivate: [authGuard()]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "contacts",
    component: ContactsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
