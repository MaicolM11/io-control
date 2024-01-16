import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';


const PRIMENG_MODULES =[ButtonModule, InputNumberModule, CardModule]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...PRIMENG_MODULES,
    
  ],
  exports: [...PRIMENG_MODULES]
})
export class PrimengLibModule { }
