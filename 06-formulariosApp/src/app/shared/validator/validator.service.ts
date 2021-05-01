import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  public nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() {}

  noPuedeSerStrider(control: FormControl): ValidationErrors | null {
    const value = control.value?.trim().toLowerCase();
    if (value === 'strider') {
      return {
        noStrider: true,
      };
    }
    return null;
  }

  passwordEquals(control1: string, control2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(control1)?.value;
      const pass2 = formGroup.get(control2)?.value;

      if (pass1 !== pass2) {
        formGroup.get(control2)?.setErrors({ passNoEqual: true });
        return { passNoEqual: true };
      }
      formGroup.get(control2)?.setErrors(null);
      return null;
    };
  }
}
