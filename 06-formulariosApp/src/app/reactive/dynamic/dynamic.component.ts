import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-dynamics',
  templateUrl: './dynamic.component.html',
  styles: [],
})
export class DynamicComponent {
  personForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favorites: this.fb.array(
      [
        this.fb.control('Test 1', [Validators.required]),
        this.fb.control('Test 2', [Validators.required]),
      ],
      [Validators.required]
    ),
  });

  newFavorite: FormControl = this.fb.control('', [Validators.required]);

  public get favoritesArr() {
    return this.personForm.get('favorites') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  validateControl(control: string) {
    return (
      this.personForm.controls[control].errors &&
      this.personForm.controls[control].touched
    );
  }

  addFavorite() {
    if (this.newFavorite.invalid) {
      return;
    }

    this.favoritesArr.push(
      this.fb.control(this.newFavorite.value, [Validators.required])
    );

    this.newFavorite.reset();
  }

  deleteFavorite(index: number) {
    this.favoritesArr.removeAt(index);
  }

  savePerson() {
    if (this.personForm.invalid) {
      this.personForm.markAllAsTouched();
      return;
    }
    console.log(this.personForm.value);
  }
}
