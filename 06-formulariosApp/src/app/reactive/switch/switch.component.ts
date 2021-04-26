import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switchs',
  templateUrl: './switch.component.html',
  styles: [],
})
export class SwitchComponent implements OnInit {
  switchForm: FormGroup = this.fb.group({
    genero: ['M', [Validators.required]],
    notificaciones: [true, [Validators.required]],
    condiciones: [false, [Validators.requiredTrue]],
  });

  persona = {
    genero: 'F',
    notificaciones: true,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.switchForm.reset({ ...this.persona, condiciones: false });

    this.switchForm.valueChanges.subscribe(({ condiciones, ...rest }) => {
      this.persona = rest;
    });
  }

  saveSwitch() {
    const formValue = { ...this.switchForm.value };
    delete formValue.condiciones;
    this.persona = formValue;
  }
}
