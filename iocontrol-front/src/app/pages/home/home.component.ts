import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { BarcodeService } from '../../services/barcode.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [ConfirmationService]
})
export class HomeComponent {
  numberCard: number;
  userData: string = '';
  visible: boolean = false;

  startDate: Date | undefined;
  endDate: Date | undefined;

  constructor(
    private barcodeService: BarcodeService,
    private router: Router,
    private confirmationService: ConfirmationService) {
  }

  showDialog() {
    this.visible = true;
  }

interpreted() {
    this.barcodeService.interpreter(this.userData)
      .subscribe({
        next: person => {
          this.router.navigate(['/formulario'], { state: { person, type: 'input' } });
        },
        error: () => {
          this.showErrorDialog("Error en el formato, no se pudo interpretar la trama.")
        }
      });
    this.userData = '';
  }


  downloadReport() {
    const sd = this.dateFormatter(this.startDate);
    const ed = this.dateFormatter(this.endDate);
    this.barcodeService.downloadReport(sd, ed);
    this.visible = false;
  }

  registerOutput() {
    this.barcodeService.registerOutput(this.numberCard)
      .subscribe({
        next: (register) => {
          this.router.navigate(['/formulario'], { state: { person: register.person, register, type: 'output' } });
        },
        error: () => {
          this.showErrorDialog("No se ha encontrado un registro con el número de ficha " + this.numberCard)
        }
      })
  }

  dateFormatter(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  clearDialog() {
    this.startDate = undefined;
    this.endDate = undefined;
  }

  showErrorDialog(msg: string) {
    this.confirmationService.confirm({
      header: 'Error',
      message: msg,
      acceptIcon: 'pi pi-check mr-2',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.numberCard = undefined;
      }
    });

  }
}
