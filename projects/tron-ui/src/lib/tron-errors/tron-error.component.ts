import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'tron-error',
  templateUrl: './tron-error.component.html',
  styleUrl: './tron-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    '[hidden]': '!errorList().length',
  },
})
export class TronErrorComponent {
  private readonly $errors = signal<string[]>([]);
  readonly errorList = this.$errors.asReadonly();

  set errors(value: string[]) {
    this.$errors.set(value);
  }

  get errors(): string[] {
    return this.$errors();
  }
}
