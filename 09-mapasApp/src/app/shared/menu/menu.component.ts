import { Component } from '@angular/core';

interface MenuItem {
  path: string;
  name: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class MenuComponent {
  menuItems: MenuItem[] = [
    { path: '/mapas/fullscreen', name: 'FullScreen' },
    { path: '/mapas/zoom-range', name: 'Zoom Range' },
    { path: '/mapas/markers', name: 'Markers' },
    { path: '/mapas/property', name: 'Property' },
  ];
}
