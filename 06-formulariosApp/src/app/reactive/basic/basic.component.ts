import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-basics',
  templateUrl: './basic.component.html',
  styles: [],
})
export class BasicComponent implements OnInit {
  // productForm: FormGroup = new FormGroup({
  //   product: new FormControl('RTX 3080Ti'),
  //   price: new FormControl(1500),
  //   inventory: new FormControl(5),
  // });

  productForm: FormGroup = this.fb.group({
    product: [, [Validators.required, Validators.minLength]],
    price: [, [Validators.required, Validators.min(0.1)]],
    inventory: [, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(){
    this.productForm.reset({
      product: 'Libro',
      price: 45
    })
  }

  validateControl(control: string) {
    return (
      this.productForm.controls[control].errors &&
      this.productForm.controls[control].touched
    );
  }

  saveProduct() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    console.log(this.productForm.value);
  }
}
