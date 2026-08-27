import { ChangeDetectionStrategy, Component, input, model } from "@angular/core";

@Component({
  selector: 'tron-toggle',
  imports: [],
  templateUrl: './tron-toggle.component.html',
  styleUrl: './tron-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TronToggleComponent {
  $checked = model<boolean>(false, { alias: 'checked' });
  $label = input<string>('', { alias: 'label'} );
  $disabled = input<boolean>(false, { alias: 'disabled' }); 

  toggle(): void {
    if (this.$disabled()) return;

    this.$checked.update(checked => !checked);
  }
}