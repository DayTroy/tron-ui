import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TronAlertComponent } from './tron-alert.component';
import { TronAlertService } from './tron-alert.service';

@Component({
  selector: 'tron-alert-outlet',
  imports: [TronAlertComponent],
  templateUrl: './tron-alert-outlet.component.html',
  styleUrl: './tron-alert-outlet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TronAlertOutletComponent {
  protected readonly alerts = inject(TronAlertService);
}
