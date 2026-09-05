import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TronToastOutletComponent } from '../../../tron-ui/src/public-api';
import { CATALOG_NAV } from './catalog-nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TronToastOutletComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly nav = CATALOG_NAV;
}
