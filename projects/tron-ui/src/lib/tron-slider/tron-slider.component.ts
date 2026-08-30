import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  input,
  signal,
  viewChild
} from '@angular/core';
import { TronControl } from '../core/tron-control';

@Component({
  selector: 'tron-slider',
  imports: [],
  templateUrl: './tron-slider.component.html',
  styleUrl: './tron-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TronSliderComponent extends TronControl<number> {
  readonly $min = input<number>(0, { alias: 'min' });
  readonly $max = input<number>(100, { alias: 'max' });
  readonly $step = input<number>(1, { alias: 'step' });

  readonly $isDragging = signal(false);
  readonly $track = viewChild.required<ElementRef<HTMLDivElement>>('track');

  readonly $percent = computed(() => {
    const min = this.$min();
    const max = this.$max();
    const span = max - min;
    if (span === 0) return 0;

    const value = this.$value() ?? min;
    return ((value - min) / span) * 100;
  });

  constructor() {
    super();

    effect((onCleanup) => {
      if (!this.$isDragging()) return;

      const onMouseMove = (e: MouseEvent) => this.emitValue(this.calculateValueFromEvent(e));
      const onMouseUp = () => this.$isDragging.set(false);

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

      onCleanup(() => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      });
    });
  }

  onTrackMouseDown(event: MouseEvent): void {
    if (this.$isDisabled()) return;

    this.$isDragging.set(true);
    this.emitValue(this.calculateValueFromEvent(event));
    this.onTouched();
  }

  override writeValue(value: number | null): void {
    super.writeValue(this.clamp(value ?? this.$min()));
  }

  private calculateValueFromEvent(event: MouseEvent): number {
    const rect = this.$track().nativeElement.getBoundingClientRect();

    const rawRatio = (event.clientX - rect.left) / rect.width;
    const clampedRatio = Math.min(1, Math.max(0, rawRatio));

    const min = this.$min();
    const max = this.$max();
    const rawValue = min + clampedRatio * (max - min);

    return this.clamp(rawValue);
  }

  private clamp(rawValue: number): number {
    const min = this.$min();
    const max = this.$max();
    const step = this.$step();
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.min(max, Math.max(min, steppedValue));
  }
}
