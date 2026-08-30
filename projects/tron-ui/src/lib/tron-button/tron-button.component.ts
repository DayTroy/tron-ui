import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TronControl } from '../core/tron-control';

let nextId = 0;

@Component({
  selector: 'tron-button',
  imports: [],
  templateUrl: './tron-button.component.html',
  styleUrl: './tron-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TronButtonComponent {
  readonly $type = input<'button' | 'submit' | 'reset'>('button', { alias: 'type' });
  readonly $variant = input<'primary' | 'ghost' | 'danger'>('primary', { alias: 'variant' });
  readonly $size = input<'sm' | 'md'>('md', { alias: 'size' });
  readonly $disabled = input<boolean>(false, { alias: 'disabled' });
}
