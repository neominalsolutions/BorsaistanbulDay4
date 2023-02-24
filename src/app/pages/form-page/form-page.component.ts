import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  DemoFormComponent,
  DemoFormState,
} from './feature/demo-form/demo-form.component';

@Component({
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css'],
})
export class FormPageComponent implements AfterViewInit, OnInit {
  @ViewChild('form') form!: DemoFormComponent;

  ngOnInit(): void {
    console.log('on-init', this.form);
  }

  ngAfterViewInit(): void {
    // this.form.changeValidation('street', [Validators.required]);

    console.log('form', this.form);

    const data: DemoFormState = {
      firstname: 'mehmet',
      lastname: 'kan',
      age: 21,
    };

    this.form.pathValue(data);
  }
}
