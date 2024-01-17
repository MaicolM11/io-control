import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-formpage',
  templateUrl: './formpage.component.html',
  styleUrl: './formpage.component.css',
  providers: [DatePipe]
})
export class FormpageComponent {

  constructor(private datePipe: DatePipe) {}


  get nowDate() {
    const currentDateTime = new Date();
    return this.datePipe.transform(currentDateTime, 'yyyy-MM-dd HH:mm:ss') || '';  
  }
}
