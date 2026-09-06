import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  TronButtonComponent,
  TronInputComponent,
  TronLoaderBlockComponent,
  TronLoaderComponent,
  TronLoaderService,
} from '../../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-loader-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TronButtonComponent,
    TronInputComponent,
    TronLoaderBlockComponent,
    TronLoaderComponent,
  ],
  templateUrl: './loader-page.component.html',
})
export class LoaderPageComponent {
  private readonly loader = inject(TronLoaderService);

  readonly isActive = this.loader.$isActive;
  readonly panelBusy = signal(false);
  readonly callsign = new FormControl('');

  blockFor(ms: number): void {
    const ref = this.loader.show({ message: 'Syncing grid' });
    setTimeout(() => ref.close(), ms);
  }

  /** Two tasks at once: the overlay must survive the first one finishing. */
  blockTwice(): void {
    const fast = this.loader.show({ message: 'Two tasks in flight' });
    const slow = this.loader.show();

    setTimeout(() => fast.close(), 1200);
    setTimeout(() => slow.close(), 3000);
  }

  busyPanel(): void {
    this.panelBusy.set(true);
    setTimeout(() => this.panelBusy.set(false), 2500);
  }
}
