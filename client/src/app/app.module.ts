import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocketModule } from './socketGateway/socket.module';

@NgModule({
  declarations: [AppComponent, UserAuthComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    SocketModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
