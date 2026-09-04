import { Component, inject, TemplateRef, viewChild } from '@angular/core';
import { TronButtonComponent, TronDrawerService } from '../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-drawer-page',
  standalone: true,
  imports: [TronButtonComponent],
  template: `
    <section class="catalog">
      <header class="catalog__head">
        <h1>Drawer</h1>
        <p>Side panel. position start / end, slide in and out.</p>
      </header>

      <div class="catalog__block">
        <h2>Open</h2>
        <div class="catalog__row">
          <tron-button (click)="open('end')">Sector log · end</tron-button>
          <tron-button variant="ghost" (click)="open('start')">Sector log · start</tron-button>
        </div>
      </div>
    </section>

    <ng-template #sectorLog>
      <p>Incoming packets from sector 7-G. MCP is watching this channel.</p>
      <p>04:12:08 · handshake accepted · disc signature matched</p>
      <p>04:12:11 · routing table sync · 2048 nodes</p>
      <p>04:12:14 · anomaly ignored · below threshold</p>

      <div class="tron-drawer__actions">
        <tron-button variant="ghost" (click)="drawer.hide()">Close</tron-button>
      </div>
    </ng-template>
  `,
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
