import { Component, signal } from '@angular/core';
import { TronToggleComponent } from '../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-toggle-page',
  standalone: true,
  imports: [TronToggleComponent],
  template: `
    <section class="catalog">
      <header class="catalog__head">
        <h1>Toggle</h1>
        <p>Boolean control with label.</p>
      </header>

      <div class="catalog__block">
        <h2>States</h2>
        <div class="catalog__stack">
          <tron-toggle label="Grid uplink" [(value)]="on$" />
          <tron-toggle label="Disabled" [disabled]="true" />
        </div>
      </div>
    </section>
  `,
})
export class TogglePageComponent {
  readonly on$ = signal(false);
}
