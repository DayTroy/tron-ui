import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, input, signal, untracked } from '@angular/core';
import { TronControl } from '../core/tron-control';

export interface TronSelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

let nextId = 0;

@Component({
  selector: 'tron-select',
  imports: [],
  templateUrl: './tron-select.component.html',
  styleUrl: './tron-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TronSelectComponent extends TronControl<string | number> {
  readonly $label = input('', { alias: 'label' });
  readonly $placeholder = input('', { alias: 'placeholder' });
  readonly $hint = input('', { alias: 'hint' });
  readonly $options = input<TronSelectOption[]>([], { alias: 'options' });

  readonly $isOpen = signal(false);
  readonly $highlightedIndex = signal(-1);

  protected readonly fieldId = `tron-select-${nextId++}`;
  protected readonly listboxId = `${this.fieldId}-listbox`;

  private readonly host = inject(ElementRef<HTMLElement>);

  readonly $display = computed(() => {
    const value = this.$value();
    return this.$options().find((option) => option.value === value)?.label ?? '';
  });

  readonly $isInvalid = computed(() => {
    this.$value();
    this.$isOpen();
    if (this.$isDisabled()) return false;
    const control = this.ngControl;
    return !!(control?.invalid && (control.dirty || control.touched));
  });

  readonly $activeDescendant = computed(() => {
    if (!this.$isOpen()) return null;
    const index = this.$highlightedIndex();
    return index >= 0 ? this.optionId(index) : null;
  });

  constructor() {
    super();

    effect((onCleanup) => {
      if (!this.$isOpen()) return;

      const onPointerDown = (event: Event) => {
        if (!this.host.nativeElement.contains(event.target as Node)) {
          this.close(true);
        }
      };

      document.addEventListener('mousedown', onPointerDown);
      onCleanup(() => document.removeEventListener('mousedown', onPointerDown));
    });

    effect(() => {
      if (this.$isDisabled() && this.$isOpen()) {
        untracked(() => this.$isOpen.set(false));
      }
    });
  }

  optionId(index: number): string {
    return `${this.fieldId}-option-${index}`;
  }

  toggle(): void {
    if (this.$isDisabled()) return;
    this.$isOpen() ? this.close(false) : this.open();
  }

  select(option: TronSelectOption, event?: Event): void {
    event?.preventDefault();
    if (option.disabled) return;
    this.emitValue(option.value);
    this.close(true);
  }

  highlight(index: number): void {
    const option = this.$options()[index];
    if (!option || option.disabled) return;
    this.$highlightedIndex.set(index);
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.$isDisabled()) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.$isOpen() ? this.moveHighlight(1) : this.open();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.$isOpen() ? this.moveHighlight(-1) : this.open();
        break;
      case 'Enter':
      case ' ':
        if (this.$isOpen()) {
          event.preventDefault();
          this.selectHighlighted();
        }
        break;
      case 'Escape':
        if (this.$isOpen()) {
          event.preventDefault();
          this.close(false);
        }
        break;
    }
  }

  onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (next && this.host.nativeElement.contains(next)) return;
    if (this.$isOpen()) {
      this.close(true);
    } else {
      this.onTouched();
    }
  }

  private open(): void {
    this.$isOpen.set(true);
    this.$highlightedIndex.set(this.initialHighlightIndex());
  }

  private close(touched: boolean): void {
    if (touched) this.onTouched();
    this.$isOpen.set(false);
    this.$highlightedIndex.set(-1);
  }

  private selectHighlighted(): void {
    const option = this.$options()[this.$highlightedIndex()];
    if (option) this.select(option);
  }

  private initialHighlightIndex(): number {
    const options = this.$options();
    const value = this.$value();
    const selected = options.findIndex((option) => option.value === value && !option.disabled);
    if (selected >= 0) return selected;
    return options.findIndex((option) => !option.disabled);
  }

  private moveHighlight(delta: number): void {
    const options = this.$options();
    if (!options.length) return;

    let index = this.$highlightedIndex();
    for (let i = 0; i < options.length; i++) {
      index = (index + delta + options.length) % options.length;
      if (!options[index].disabled) {
        this.$highlightedIndex.set(index);
        return;
      }
    }
  }
}
