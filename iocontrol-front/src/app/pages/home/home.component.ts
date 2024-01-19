import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { BarcodeService } from '../../services/barcode.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  numberCard: number;
  private userData: string = '';

  constructor(
    private barcodeService: BarcodeService, 
    private router: Router) {
  }


  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.barcodeService.interpreter(this.userData)
        .subscribe(person => { 
          this.router.navigate(['/formulario'], { state: { person, type: 'input' } });
        });
      this.userData = '';
    } else {
      this.userData += event.key;
    }
  }

  registerOutput() {
    this.barcodeService.registerOutput(this.numberCard)
      .subscribe({ 
        next: (register) => {
          this.router.navigate(['/formulario'], { state: {  person: register.person, register, type: 'output' } });
        }
      })
  }

}
