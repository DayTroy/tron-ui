import { CdkTrapFocus } from '@angular/cdk/a11y';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, TemplateRef } from '@angular/core';
import { type TronDialogContent } from './tron-dialog.service';

let nextId = 0;

@Component({
  selector: 'tron-dialog',
  imports: [CdkTrapFocus, NgComponentOutlet, NgTemplateOutlet],
  templateUrl: './tron-dialog.component.html',
  styleUrl: './tron-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TronDialogComponent {
  readonly $title = input.required<string>({ alias: 'title' });
  readonly $subtitle = input('', { alias: 'subtitle' });
  readonly $content = input.required<TronDialogContent>({ alias: 'content' });

  protected readonly $template = computed(() => {
    const content = this.$content();
    return content instanceof TemplateRef ? content : null;
  });

  protected readonly $component = computed(() => {
    const content = this.$content();
    return content instanceof TemplateRef ? null : content;
  });

  protected readonly titleId = `tron-dialog-title-${nextId++}`;

  close = () => {};
}
