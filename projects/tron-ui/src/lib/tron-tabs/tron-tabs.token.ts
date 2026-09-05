import { InjectionToken, Signal } from '@angular/core';

/**
 * The group queries tabs by class, so a tab must never import the group back.
 * Both sides meet on this contract instead.
 */
export interface TronTabsHost {
  readonly $activeIndex: Signal<number>;
  indexOf(tab: unknown): number;
  tabId(index: number): string;
  panelId(index: number): string;
}

export const TRON_TABS = new InjectionToken<TronTabsHost>('TRON_TABS');
