import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPerson } from '../../interfaces/person';
import { BarcodeService } from '../../services/barcode.service';

@Component({
  selector: 'app-formpage',
  templateUrl: './formpage.component.html',
  styleUrl: './formpage.component.css',
  providers: [DatePipe]
})
export class FormpageComponent implements OnInit {

  constructor(private datePipe: DatePipe,
    private router: Router,
    private fb: FormBuilder,
    private barcodeService: BarcodeService) {}

  
  form: FormGroup;
  person: IPerson;
  type: string;

  ngOnInit(): void {
    this.person = history.state.data;
    this.type = history.state.type;
    this.form = this.fb.group({
      name: [this.person.name, Validators.required],
      lastname: [this.person.lastname, Validators.required],
      identification: [this.person.identification, Validators.required],
      photo: [this.person.photo, Validators.required],
      numberCard: [null, Validators.required]
    });
  }

  get nowDate() {
    const currentDateTime = new Date();
    return this.datePipe.transform(currentDateTime, 'yyyy-MM-dd HH:mm:ss') || '';  
  }

  home() {
    this.router.navigateByUrl("/");
  }

  register() {
    const payload : IPerson = this.form.value;
    this.barcodeService.register(payload, this.form.value.numberCard)
      .subscribe({ 
        next: () => this.router.navigateByUrl("/")
      });
  }

}
