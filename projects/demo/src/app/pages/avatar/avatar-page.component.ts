import { Component } from '@angular/core';
import { TronAvatarComponent } from '../../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-avatar-page',
  standalone: true,
  imports: [TronAvatarComponent],
  templateUrl: './avatar-page.component.html',
})
export class AvatarPageComponent {}
