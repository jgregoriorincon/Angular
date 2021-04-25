import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styles: [],
})
export class BasicComponent implements OnInit {
  @ViewChild('productForm') productForm!: NgForm;

  constructor() {}

  ngOnInit(): void {}

  nameProductValid(): boolean {
    return (
      this.productForm?.controls.product?.invalid &&
      this.productForm?.controls.product?.touched
    );
  }
  valPriceValid(): boolean {
    return (
      this.productForm?.controls.price?.invalid &&
      this.productForm?.controls.price?.touched
    );
  }
  saveProduct() {
    console.log(this.productForm);
  }
}
