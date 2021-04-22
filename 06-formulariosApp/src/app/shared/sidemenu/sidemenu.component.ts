import { Component } from '@angular/core';

interface MenuItem {
  text: string;
  route: string;
}
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styles: [],
})
export class SidemenuComponent {
  templateMenu: MenuItem[] = [
    {
      text: 'Basic',
      route: './template/basic',
    },
    {
      text: 'Dynamic',
      route: './template/dynamic',
    },
    {
      text: 'Switch',
      route: './template/switch',
    },
  ];
  reactiveMenu: MenuItem[] = [
    {
      text: 'Basic',
      route: './reactive/basic',
    },
    {
      text: 'Dynamic',
      route: './reactive/dynamic',
    },
    {
      text: 'Switch',
      route: './reactive/switch',
    },
  ];
}
