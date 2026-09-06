import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { computed, inject, Injectable, signal } from '@angular/core';
import { TronOverlayService } from '../core/overlay';
import { TronLoaderOverlayComponent } from './tron-loader-overlay.component';
import { TronLoaderType, TronLoaderVariant } from './tron-loader.component';

export interface TronLoaderConfig {
  message?: string;
  variant?: TronLoaderVariant;
  type?: TronLoaderType;
}

/** One handle per task. Closing twice must not unbalance the counter. */
export class TronLoaderRef {
  private closed = false;

  constructor(private readonly onClose: () => void) {}

  close(): void {
    if (this.closed) return;
    this.closed = true;
    this.onClose();
  }
}

@Injectable({
  providedIn: 'root'
})
export class TronLoaderService {
  private readonly overlays = inject(TronOverlayService);
  private readonly $pending = signal(0);

  private overlayRef: OverlayRef | null = null;

  readonly $isActive = computed(() => this.$pending() > 0);

  /**
   * Counts tasks instead of flipping a flag: with two requests in flight, the first
   * one to finish must not tear down the overlay the second one still needs.
   */
  show(config: TronLoaderConfig = {}): TronLoaderRef {
    this.$pending.update((count) => count + 1);
    if (!this.overlayRef) this.open(config);

    return new TronLoaderRef(() => this.release());
  }

  /** Hard stop for route guards and error handlers, whatever the count says. */
  reset(): void {
    this.$pending.set(0);
    this.close();
  }

  private release(): void {
    this.$pending.update((count) => Math.max(0, count - 1));
    if (this.$pending() === 0) this.close();
  }

  private open(config: TronLoaderConfig): void {
    this.overlayRef = this.overlays.createFullscreen({
      backdropClass: 'tron-loader-backdrop',
      panelClass: 'tron-loader-pane',
    });

    const host = this.overlayRef.attach(new ComponentPortal(TronLoaderOverlayComponent));
    host.setInput('message', config.message ?? '');
    host.setInput('variant', config.variant ?? 'disc');
    host.setInput('type', config.type ?? 'primary');

    // Navigation disposes the overlay behind our back; without this the stale ref
    // would block every later show() and the count would never drain.
    this.overlayRef.detachments().subscribe(() => {
      this.overlayRef = null;
      this.$pending.set(0);
    });
  }

  private close(): void {
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }
}
