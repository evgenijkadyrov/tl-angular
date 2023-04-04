import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifyComponent } from './components/notify/notify.component';

@NgModule({
  declarations: [NotifyComponent],
  exports: [NotifyComponent],
  imports: [CommonModule],
})
export class SharedModule {}
