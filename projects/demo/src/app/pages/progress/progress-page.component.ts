import { Component } from '@angular/core';
import { TronProgressComponent } from '../../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-progress-page',
  standalone: true,
  imports: [TronProgressComponent],
  templateUrl: './progress-page.component.html',
})
export class ProgressPageComponent {}
