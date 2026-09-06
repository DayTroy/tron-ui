import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type TronLoaderVariant = 'matrix' | 'disc' | 'cycle' | 'bars';
export type TronLoaderSize = 'sm' | 'md' | 'lg' | 'xl';
export type TronLoaderType = 'primary' | 'accent' | 'success' | 'warning' | 'danger';

/** Perimeter cells of the 3x3 grid carry the travelling pulse; the middle one stays dim. */
const MATRIX_CELLS = 9;
const BARS = 4;

@Component({
  selector: 'tron-loader',
  imports: [],
  templateUrl: './tron-loader.component.html',
  styleUrl: './tron-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    role: 'status',
    '[attr.aria-label]': '$label()',
  },
})
export class TronLoaderComponent {
  readonly $variant = input<TronLoaderVariant>('matrix', { alias: 'variant' });
  readonly $size = input<TronLoaderSize>('md', { alias: 'size' });
  readonly $type = input<TronLoaderType>('primary', { alias: 'type' });
  readonly $label = input<string>('Loading', { alias: 'label' });

  protected readonly cells = Array.from({ length: MATRIX_CELLS });
  protected readonly bars = Array.from({ length: BARS });

  protected readonly $classes = computed(() =>
    [
      `tron-loader--${this.$variant()}`,
      `tron-loader--${this.$size()}`,
      `tron-loader--${this.$type()}`,
    ].join(' ')
  );
}
