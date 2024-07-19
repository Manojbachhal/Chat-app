import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ChatsComponent } from './chats/chats.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { authGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    component: UserAuthComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
