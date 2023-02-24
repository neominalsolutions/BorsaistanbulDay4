import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationFn } from 'ngx-permissions';

export type DemoFormState = {
  firstname: string;
  lastname: string;
  age: number;
};

@Component({
  selector: 'app-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.css'],
})
export class DemoFormComponent {
  DemoForm: FormGroup = this.fb.group({
    firstname: ['ali', Validators.required],
    lastname: ['can', Validators.required],
    age: [34, [Validators.min(18), Validators.max(22)]],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
    tags: this.fb.array([
      // form içerisinde array ile işlem yapma
      this.fb.control(''),
      // this.fb.group({
      //   name:[''],
      //   title:['']
      // }),
    ]),
  });

  // add butonuna basınca boş bir form control getirmek için yaptık
  addTag() {
    this.tags.push(this.fb.control(''));
  }

  get tags() {
    return this.DemoForm.get('tags') as FormArray;
  }

  constructor(private fb: FormBuilder) {
    // form control value takip yapabiliriz
    this.DemoForm.valueChanges.subscribe((formValue) => {
      console.log('valueChanges', formValue);
    });

    // input değişimini dinleyip başka bir inputun dolması için logic uyguladım
    this.DemoForm.get('firstname')?.valueChanges.subscribe(
      (newValue: string) => {
        if (newValue == 'istanbul') {
          this.DemoForm.get('address.zip')?.setValue('34000');
        }
      }
    );
  }

  onFormSubmit() {
    console.log('form', this.DemoForm.value);

    // this.DemoForm.get('firstname')?.hasError('required');
    // this.DemoForm.get('firstname')?.hasValidator(Validators.required);
  }

  changeValidation(formControlName: string, validators: Validators) {
    this.DemoForm.get(formControlName)?.addValidators([Validators.required]);
    // form control validayon güncelle
    this.DemoForm.get(formControlName)?.updateValueAndValidity();
    // validasyon kod ile güncellensin.
  }

  // edit version
  pathValue(formState: DemoFormState) {
    // forma ait bilgileri tek sefere form-group bind et
    this.DemoForm.patchValue(formState);
  }
}
