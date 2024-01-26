import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
const PRIMENG_MODULES =[ButtonModule, InputNumberModule, CardModule, InputTextModule, FileUploadModule,
  DialogModule, CalendarModule, ConfirmDialogModule]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...PRIMENG_MODULES,
    
  ],
  exports: [...PRIMENG_MODULES]
})
export class PrimengLibModule { }
