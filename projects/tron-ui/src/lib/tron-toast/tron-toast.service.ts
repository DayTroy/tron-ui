import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable, signal } from '@angular/core';
import { TronOverlayService } from '../core/overlay';
import { TronToastOutletComponent } from './tron-toast-outlet.component';

export type TronToastType = 'info' | 'success' | 'warning' | 'danger';

export interface TronToastItem {
  id: string;
  type: TronToastType;
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class TronToastService {
  readonly $items = signal<TronToastItem[]>([]);

  private readonly overlays = inject(TronOverlayService);
  private overlayRef: OverlayRef | null = null;
  private readonly timers = new Map<string, ReturnType<typeof setTimeout>>();

  show(title: string, type: TronToastType = 'info', message = '', duration = 4000): string {
    const id = crypto.randomUUID();
    const item: TronToastItem = { id, type, title, message };
    const items = this.$items();

    if (items.length >= 3) {
      this.dismiss(items[items.length - 1].id);
    }

    this.$items.update((current) => [item, ...current]);
    this.ensureHost();

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
    this.teardownIfEmpty();
  }

  clear(): void {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();
    this.$items.set([]);
    this.teardownIfEmpty();
  }

  private ensureHost(): void {
    if (this.overlayRef) return;

    this.overlayRef = this.overlays.createChrome({
      panelClass: 'tron-toast-pane',
    });
    this.overlayRef.attach(new ComponentPortal(TronToastOutletComponent));
    this.overlayRef.detachments().subscribe(() => this.overlayRef = null);
  }

  private teardownIfEmpty(): void {
    if (this.$items().length > 0) return;
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }

  private clearTimer(id: string): void {
    const timer = this.timers.get(id);
    if (!timer) return;
    clearTimeout(timer);
    this.timers.delete(id);
  }
}
