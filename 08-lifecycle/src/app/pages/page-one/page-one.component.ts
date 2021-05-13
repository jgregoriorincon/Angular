import {
  Component,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styles: [],
})
export class PageOneComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy {
  nombre: string = 'Gregorio';
  segundos: number = 0;
  timerSuscription!: Subscription;

  constructor() {
    console.log('constructor');
  }
  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    console.log('ngOnChanges');
  }
  ngDoCheck(): void {
    console.log('ngDoCheck');
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.timerSuscription.unsubscribe();
    console.log('Timer limpiado;');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.timerSuscription = interval(1000).subscribe((i) => {
      this.segundos = i;
    });
  }
}
