import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  signal,
  viewChild
} from '@angular/core';
import { Subject, finalize, fromEvent, merge, startWith, switchMap, takeUntil } from 'rxjs';
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
  readonly $thumb = viewChild.required<ElementRef<HTMLDivElement>>('thumb');

  private readonly pointerDown$ = new Subject<PointerEvent>();

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

    this.pointerDown$
      .pipe(
        switchMap((start) => this.drag(start)),
        takeUntil(this.destroyed$))
      .subscribe((event) => this.emitValue(this.calculateValueFromEvent(event)));
  }

  onPointerDown(event: PointerEvent): void {
    if (this.$isDisabled() || event.button !== 0) return;

    event.preventDefault();
    this.pointerDown$.next(event);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.$isDisabled()) return;

    const step = this.$step();
    const value = this.$value() ?? this.$min();
    let next: number | null = null;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        next = value - step;
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        next = value + step;
        break;
      case 'Home':
        next = this.$min();
        break;
      case 'End':
        next = this.$max();
        break;
      default:
        return;
    }

    event.preventDefault();
    this.onTouched();
    this.emitValue(this.clamp(next));
  }

  override writeValue(value: number | null): void {
    super.writeValue(this.clamp(value ?? this.$min()));
  }

  private drag(start: PointerEvent) {
    this.$isDragging.set(true);
    this.onTouched();
    this.$thumb().nativeElement.focus({ preventScroll: true });

    return fromEvent<PointerEvent>(document, 'pointermove').pipe(
      startWith(start),
      takeUntil(
        merge(
          fromEvent(document, 'pointerup'),
          fromEvent(document, 'pointercancel')
        )
      ),
      finalize(() => this.$isDragging.set(false))
    );
  }

  private calculateValueFromEvent(event: PointerEvent): number {
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
