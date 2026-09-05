import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { TRON_TABS } from './tron-tabs.token';

@Component({
  selector: 'tron-tab',
  imports: [],
  templateUrl: './tron-tab.component.html',
  styleUrl: './tron-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    role: 'tabpanel',
    '[id]': '$panelId()',
    '[hidden]': '!$isActive()',
    '[attr.aria-labelledby]': '$tabId()',
    '[attr.tabindex]': '$isActive() ? 0 : null',
  },
})
export class TronTabComponent {
  readonly $label = input.required<string>({ alias: 'label' });
  readonly $disabled = input<boolean>(false, { alias: 'disabled' });

  /** The group owns the selection; a tab outside one has nothing to belong to. */
  private readonly tabs = inject(TRON_TABS);

  readonly $index = computed(() => this.tabs.indexOf(this));
  readonly $isActive = computed(() => this.$index() === this.tabs.$activeIndex());

  protected readonly $tabId = computed(() => this.tabs.tabId(this.$index()));
  protected readonly $panelId = computed(() => this.tabs.panelId(this.$index()));
}
