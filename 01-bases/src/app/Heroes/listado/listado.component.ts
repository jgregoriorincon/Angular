import { Component } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: 'listado.component.html',
  styleUrls: ['listado.component.css']
})
export class ListadoComponent {

  heroes:string[] = ['Spiderman', 'Ironman', 'Hulk', 'Ironman', 'Capitán América'];
  heroeBorrado:string = '';

  borrarHeroe():void{
    this.heroeBorrado = this.heroes.pop() || '';
  }
}
