import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  input,
  model,
  signal,
  viewChild
} from '@angular/core';

@Component({
  selector: 'tron-slider',
  imports: [],
  templateUrl: './tron-slider.component.html',
  styleUrl: './tron-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TronSliderComponent {
  readonly $value = model<number>(0, { alias: 'value' });
  readonly $min = input<number>(0, { alias: 'min' });
  readonly $max = input<number>(100, { alias: 'max' });
  readonly $step = input<number>(1, { alias: 'step' });

  readonly $isDragging = signal(false);
  readonly $track = viewChild.required<ElementRef<HTMLDivElement>>('track');

  readonly $percent = computed(() =>
    ((this.$value() - this.$min()) / (this.$max() - this.$min())) * 100
  );

  constructor() {
    effect((onCleanup) => {
      if (!this.$isDragging()) return;
  
      const onMouseMove = (e: MouseEvent) => this.$value.set(this.calculateValueFromEvent(e));
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
    this.$isDragging.set(true);
    this.$value.set(this.calculateValueFromEvent(event));
  }

  // Клик/драг (пиксели) -> значение в диапазоне [min, max], округлённое до step
  private calculateValueFromEvent(event: MouseEvent): number {
    const rect = this.$track().nativeElement.getBoundingClientRect();

    // 1. Доля пройденного пути по ширине трека (0..1), с ограничением краёв
    const rawRatio = (event.clientX - rect.left) / rect.width;
    const clampedRatio = Math.min(1, Math.max(0, rawRatio));

    // 2. Перевод доли в значение внутри [min, max]
    const min = this.$min();
    const max = this.$max();
    const rawValue = min + clampedRatio * (max - min);

    // 3. Округление до ближайшего кратного step
    const step = this.$step();
    const steppedValue = Math.round(rawValue / step) * step;

    // 4. Финальная защита от выхода за границы (на случай погрешностей округления)
    return Math.min(max, Math.max(min, steppedValue));
  }
}