import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthService, NotificationService],
})
export class CoreModule {}
