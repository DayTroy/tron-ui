import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TronToastComponent } from './tron-toast.component';
import { TronToastService } from './tron-toast.service';

@Component({
  selector: 'tron-toast-outlet',
  imports: [TronToastComponent],
  templateUrl: './tron-toast-outlet.component.html',
  styleUrl: './tron-toast-outlet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TronToastOutletComponent {
  protected readonly toasts = inject(TronToastService);
}
