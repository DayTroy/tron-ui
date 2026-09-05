import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, TemplateRef, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TronDrawerService, TronToastOutletComponent } from '../../../tron-ui/src/public-api';
import { CATALOG_NAV } from './catalog-nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgTemplateOutlet, TronToastOutletComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly nav = CATALOG_NAV;

  private readonly drawer = inject(TronDrawerService);
  private readonly navTpl = viewChild.required<TemplateRef<unknown>>('navTpl');

  openNav(): void {
    this.drawer.show(this.navTpl(), {
      title: 'Catalog',
      subtitle: 'Component index',
      position: 'start',
    });
  }

  closeNav(): void {
    this.drawer.hide();
  }
}
