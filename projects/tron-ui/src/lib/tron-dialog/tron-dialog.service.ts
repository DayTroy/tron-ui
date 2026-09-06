import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { inject, Injectable, TemplateRef } from '@angular/core';
import { TronOverlayService } from '../core/overlay';
import { TronDialogComponent } from './tron-dialog.component';

export type TronDialogContent<T = unknown> = TemplateRef<T> | ComponentType<T>;

export interface TronDialogConfig {
  title: string;
  subtitle?: string;
}

export class TronDialogRef {
  constructor(private readonly onClose: () => void) {}

  close(): void {
    this.onClose();
  }
}

@Injectable({
  providedIn: 'root'
})
export class TronDialogService {
  private readonly overlays = inject(TronOverlayService);
  private overlayRef: OverlayRef | null = null;

  show(content: TronDialogContent, config: TronDialogConfig): TronDialogRef {
    this.hide();

    this.overlayRef = this.overlays.createFullscreen({
      backdropClass: 'tron-dialog-backdrop',
      panelClass: 'tron-dialog-pane',
    });

    const host = this.overlayRef.attach(new ComponentPortal(TronDialogComponent));
    host.setInput('title', config.title);
    host.setInput('subtitle', config.subtitle ?? '');
    host.setInput('content', content);
    host.instance.close = () => this.hide();

    this.overlayRef.backdropClick().subscribe(() => this.hide());

    return new TronDialogRef(() => this.hide());
  }

  hide(): void {
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }
}
