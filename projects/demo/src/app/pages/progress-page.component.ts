import { Component } from '@angular/core';
import { TronProgressComponent } from '../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-progress-page',
  standalone: true,
  imports: [TronProgressComponent],
  template: `
    <section class="catalog">
      <header class="catalog__head">
        <h1>Progress</h1>
        <p>Value against max, optional label.</p>
      </header>

      <div class="catalog__block">
        <h2>Allocation</h2>
        <div class="catalog__stack">
          <tron-progress [value]="23" label="Memory Allocation" />
          <tron-progress [value]="68" label="Grid sync" />
          <tron-progress [value]="94" label="Identity disc" />
        </div>
      </div>
    </section>
  `,
})
export class ProgressPageComponent {}
