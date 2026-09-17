import { Component } from '@angular/core';
import { TronButtonComponent, TronIconComponent, TronTooltipDirective } from '../../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-tooltip-page',
  standalone: true,
  imports: [TronButtonComponent, TronIconComponent, TronTooltipDirective],
  templateUrl: './tooltip-page.component.html',
})
export class TooltipPageComponent {}
