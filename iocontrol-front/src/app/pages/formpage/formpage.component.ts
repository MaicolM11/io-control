import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPerson } from '../../interfaces/person';
import { BarcodeService } from '../../services/barcode.service';
import { IRegister } from '../../interfaces/register';

@Component({
  selector: 'app-formpage',
  templateUrl: './formpage.component.html',
  styleUrl: './formpage.component.css',
  providers: [DatePipe]
})
export class FormpageComponent {

  constructor(private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private barcodeService: BarcodeService) {
      this.ngOnInit()
    }

  
  form: FormGroup;
  person: IPerson;
  type: string;
  register: IRegister;

  ngOnInit(): void {

    this.person = history.state.person;
    this.register = history.state.register;
    this.type = history.state.type;
   
    this.form = this.fb.group({
      name: [this.person.name, Validators.required],
      lastname: [this.person.lastname, Validators.required],
      identification: [this.person.identification, Validators.required],
      photo: [this.person.photo, Validators.required],
      numberCard: [this.register?.cardNumber, Validators.required],
      startDate: [this.register?.startDateTime],
      finalDate: [this.register?.finalDateTime]
    });
  }

  get nowDate() {
    const currentDateTime = new Date();
    return this.datePipe.transform(currentDateTime, 'yyyy-MM-dd HH:mm:ss') || '';  
  }

  home() {
    this.router.navigateByUrl("/");
  }

  registerInput() {
    const payload : IPerson = this.form.value;
    this.barcodeService.register(payload, this.form.value.numberCard)
      .subscribe({ 
        next: () => this.router.navigateByUrl("/")
      });
  }

  onUpload(event) {
    const imageFile: File = event.files[0];

    const reader = new FileReader();

    reader.onload = (e: any) => {
      const base64String: string = e.target.result;
      this.form.get('photo').setValue(base64String);
    };

    reader.readAsDataURL(imageFile);  
  }

}
