import { NgModule } from '@angular/core';
import { SocketService } from './socket.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [SocketService],
})
export class SocketModule {
  constructor() {}
}
