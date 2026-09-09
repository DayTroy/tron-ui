import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { TronToastComponent } from './tron-toast.component';
import { TronToastService } from './tron-toast.service';

@Component({
  selector: 'tron-toast-outlet',
  imports: [TronToastComponent],
  templateUrl: './tron-toast-outlet.component.html',
  styleUrl: './tron-toast-outlet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Pane lives outside this view; its z-index and pointer-events cannot be scoped.
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class TronToastOutletComponent {
  protected readonly toasts = inject(TronToastService);
}
