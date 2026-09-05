import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
  ElementRef,
  model,
  untracked,
  viewChildren,
} from '@angular/core';
import { TronTabComponent } from './tron-tab.component';
import { TRON_TABS, TronTabsHost } from './tron-tabs.token';

let nextId = 0;

@Component({
  selector: 'tron-tabs',
  imports: [],
  templateUrl: './tron-tabs.component.html',
  styleUrl: './tron-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [{ provide: TRON_TABS, useExisting: TronTabsComponent }],
})
export class TronTabsComponent implements TronTabsHost {
  readonly $activeIndex = model<number>(0, { alias: 'activeIndex' });

  readonly $tabs = contentChildren(TronTabComponent);

  private readonly $buttons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');
  private readonly baseId = `tron-tabs-${nextId++}`;

  constructor() {
    // A disabled or out-of-range index would leave every panel hidden.
    effect(() => {
      const tabs = this.$tabs();
      if (!tabs.length) return;

      const active = tabs[this.$activeIndex()];
      if (active && !active.$disabled()) return;

      const fallback = tabs.findIndex((tab) => !tab.$disabled());
      if (fallback >= 0) untracked(() => this.$activeIndex.set(fallback));
    });
  }

  indexOf(tab: unknown): number {
    return this.$tabs().indexOf(tab as TronTabComponent);
  }

  tabId(index: number): string {
    return `${this.baseId}-tab-${index}`;
  }

  panelId(index: number): string {
    return `${this.baseId}-panel-${index}`;
  }

  select(index: number): void {
    const tab = this.$tabs()[index];
    if (!tab || tab.$disabled()) return;
    this.$activeIndex.set(index);
  }

  onKeydown(event: KeyboardEvent): void {
    const count = this.$tabs().length;
    if (!count) return;

    let next: number | null = null;

    switch (event.key) {
      case 'ArrowRight':
        next = this.nextEnabled(this.$activeIndex(), 1);
        break;
      case 'ArrowLeft':
        next = this.nextEnabled(this.$activeIndex(), -1);
        break;
      case 'Home':
        next = this.nextEnabled(-1, 1);
        break;
      case 'End':
        next = this.nextEnabled(count, -1);
        break;
      default:
        return;
    }

    event.preventDefault();
    if (next === null) return;

    this.select(next);
    this.$buttons()[next]?.nativeElement.focus();
  }

  private nextEnabled(from: number, delta: number): number | null {
    const tabs = this.$tabs();
    let index = from;

    for (let i = 0; i < tabs.length; i++) {
      index = (index + delta + tabs.length) % tabs.length;
      if (!tabs[index].$disabled()) return index;
    }

    return null;
  }
}
