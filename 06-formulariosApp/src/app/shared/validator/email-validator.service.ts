import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmailValidatorService implements AsyncValidator {
  constructor(private http: HttpClient) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    console.log(email);

    this.http.get<any[]>(`http://localhost:3000/usuarios?q=${email}`);
    return this.http.get<any[]>(`http://localhost:3000/usuarios?q=${email}`).pipe(
      map((resp) => {
        return resp.length === 0 ? null : { emailUsed: true };
      })
    );
  }
}
