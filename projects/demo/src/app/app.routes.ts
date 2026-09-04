import { Routes } from '@angular/router';
import { AlertPageComponent } from './pages/alert-page.component';
import { ButtonPageComponent } from './pages/button-page.component';
import { CheckboxPageComponent } from './pages/checkbox-page.component';
import { ChipPageComponent } from './pages/chip-page.component';
import { DialogPageComponent } from './pages/dialog-page.component';
import { DrawerPageComponent } from './pages/drawer-page.component';
import { FormPageComponent } from './pages/form-page.component';
import { InputPageComponent } from './pages/input-page.component';
import { ProgressPageComponent } from './pages/progress-page.component';
import { SelectPageComponent } from './pages/select-page.component';
import { SliderPageComponent } from './pages/slider-page.component';
import { StepperPageComponent } from './pages/stepper-page.component';
import { TogglePageComponent } from './pages/toggle-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'button' },
  { path: 'button', component: ButtonPageComponent },
  { path: 'input', component: InputPageComponent },
  { path: 'select', component: SelectPageComponent },
  { path: 'toggle', component: TogglePageComponent },
  { path: 'checkbox', component: CheckboxPageComponent },
  { path: 'slider', component: SliderPageComponent },
  { path: 'chip', component: ChipPageComponent },
  { path: 'progress', component: ProgressPageComponent },
  { path: 'stepper', component: StepperPageComponent },
  { path: 'dialog', component: DialogPageComponent },
  { path: 'drawer', component: DrawerPageComponent },
  { path: 'alert', component: AlertPageComponent },
  { path: 'form', component: FormPageComponent },
];
