import { Injectable, signal } from '@angular/core';

export type TronAlertType = 'info' | 'success' | 'warning' | 'danger';

export interface TronAlertItem {
  id: string;
  type: TronAlertType;
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class TronAlertService {
  readonly $items = signal<TronAlertItem[]>([]);

  private readonly timers = new Map<string, ReturnType<typeof setTimeout>>();

  show(title: string, type: TronAlertType = 'info', message = '', duration = 4000): string {
    const id = crypto.randomUUID();
    const item: TronAlertItem = { id, type, title, message };
    const items = this.$items();

    if (items.length >= 3) {
      this.dismiss(items[items.length - 1].id);
    }

    this.$items.update((current) => [item, ...current]);

    if (duration > 0) {
      const timer = setTimeout(() => this.dismiss(id), duration);
      this.timers.set(id, timer);
    }

    return id;
  }

  info(title: string, message = ''): string {
    return this.show(title, 'info', message);
  }

  success(title: string, message = ''): string {
    return this.show(title, 'success', message);
  }

  warning(title: string, message = ''): string {
    return this.show(title, 'warning', message);
  }

  danger(title: string, message = ''): string {
    return this.show(title, 'danger', message);
  }

  dismiss(id: string): void {
    this.clearTimer(id);
    this.$items.update((items) => items.filter((item) => item.id !== id));
  }

  clear(): void {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();
    this.$items.set([]);
  }

  private clearTimer(id: string): void {
    const timer = this.timers.get(id);
    if (!timer) return;
    clearTimeout(timer);
    this.timers.delete(id);
  }
}
