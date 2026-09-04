import { Component } from '@angular/core';
import { TronChipComponent } from '../../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-chip-page',
  standalone: true,
  imports: [TronChipComponent],
  templateUrl: './chip-page.component.html',
})
export class ChipPageComponent {}
