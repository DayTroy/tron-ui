import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tron-tooltip',
  imports: [],
  template: '{{ $text() }}',
  styleUrl: './tron-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  host: {
    class: 'tron-tooltip',
    role: 'tooltip',
    '[id]': '$id()',
  },
})
export class TronTooltipComponent {
  readonly $text = input.required<string>({ alias: 'text' });
  readonly $id = input.required<string>({ alias: 'id' });
}
