import { Component, inject, TemplateRef, viewChild } from '@angular/core';
import { TronButtonComponent, TronDrawerService } from '../../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-drawer-page',
  standalone: true,
  imports: [TronButtonComponent],
  templateUrl: './drawer-page.component.html',
})
export class DrawerPageComponent {
  readonly drawer = inject(TronDrawerService);
  private readonly sectorLogTpl = viewChild.required<TemplateRef<unknown>>('sectorLog');

  open(position: 'start' | 'end'): void {
    this.drawer.show(this.sectorLogTpl(), {
      title: 'Sector log',
      subtitle: 'Live feed · 7-G',
      position,
    });
  }
}
