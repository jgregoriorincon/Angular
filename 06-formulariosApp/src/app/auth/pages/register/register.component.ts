import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group(
    {
      nombreApellido: [
        '',
        [Validators.required, Validators.pattern(this.vs.nombreApellidoPattern)],
      ],
      email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)], [this.ev]],
      username: ['', [Validators.required, this.vs.noPuedeSerStrider]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [this.vs.passwordEquals('password', 'confirmPassword')],
    }
  );

  get emailErrorMsg(): string {
    const errors = this.registerForm.get('email')?.errors;
    if (errors?.required) {
      return 'El email es obligatorio';
    } else if (errors?.pattern) {
      return 'El email no tiene el formato correcto';
    } else if (errors?.emailUsed) {
      return 'El email ya fue utilizado en el sistema';
    }
    return '';
  }

  constructor(
    private fb: FormBuilder,
    private vs: ValidatorService,
    private ev: EmailValidatorService
  ) {}

  ngOnInit(): void {
    this.registerForm.reset({
      nombreApellido: 'Jose Rincon',
      email: 'test1@test.com',
      username: 'jgregorio',
      password: '123456',
      confirmPassword: '123456',
    });
  }

  controlValid(control: string) {
    return this.registerForm.get(control)?.invalid && this.registerForm.get(control)?.touched;
  }

  submitForm() {
    console.log(this.registerForm.value);

    this.registerForm.markAllAsTouched();
  }
}
