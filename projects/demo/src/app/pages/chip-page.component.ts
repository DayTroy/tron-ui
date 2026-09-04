import { Component } from '@angular/core';
import { TronChipComponent } from '../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-chip-page',
  standalone: true,
  imports: [TronChipComponent],
  template: `
    <section class="catalog">
      <header class="catalog__head">
        <h1>Chip</h1>
        <p>Status tokens and pulse / dot markers.</p>
      </header>

      <div class="catalog__block">
        <h2>Variants</h2>
        <div class="catalog__row">
          <tron-chip>Core</tron-chip>
          <tron-chip variant="success">Stable</tron-chip>
          <tron-chip variant="warning">Anomaly</tron-chip>
          <tron-chip variant="danger">Derezzed</tron-chip>
          <tron-chip variant="accent">CLU</tron-chip>
          <tron-chip [disabled]="true">Offline</tron-chip>
        </div>
      </div>

      <div class="catalog__block">
        <h2>Markers</h2>
        <div class="catalog__row">
          <tron-chip type="pulse">Online</tron-chip>
          <tron-chip variant="success" type="pulse">Active</tron-chip>
          <tron-chip variant="warning" type="dot">Standby</tron-chip>
          <tron-chip variant="danger" type="pulse">Critical</tron-chip>
        </div>
      </div>
    </section>
  `,
})
export class ChipPageComponent {}
