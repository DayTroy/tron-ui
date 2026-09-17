import { Routes } from '@angular/router';
import { ToastPageComponent } from './pages/toast/toast-page.component';
import { AvatarPageComponent } from './pages/avatar/avatar-page.component';
import { ButtonPageComponent } from './pages/button/button-page.component';
import { CheckboxPageComponent } from './pages/checkbox/checkbox-page.component';
import { ChipPageComponent } from './pages/chip/chip-page.component';
import { DialogPageComponent } from './pages/dialog/dialog-page.component';
import { DrawerPageComponent } from './pages/drawer/drawer-page.component';
import { FormPageComponent } from './pages/form/form-page.component';
import { IconPageComponent } from './pages/icon/icon-page.component';
import { InputPageComponent } from './pages/input/input-page.component';
import { LoaderPageComponent } from './pages/loader/loader-page.component';
import { ProgressPageComponent } from './pages/progress/progress-page.component';
import { RadioPageComponent } from './pages/radio/radio-page.component';
import { SelectPageComponent } from './pages/select/select-page.component';
import { SliderPageComponent } from './pages/slider/slider-page.component';
import { StepperPageComponent } from './pages/stepper/stepper-page.component';
import { TabsPageComponent } from './pages/tabs/tabs-page.component';
import { TextareaPageComponent } from './pages/textarea/textarea-page.component';
import { TogglePageComponent } from './pages/toggle/toggle-page.component';
import { TooltipPageComponent } from './pages/tooltip/tooltip-page.component';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'button' },
  { path: 'button', component: ButtonPageComponent },
  { path: 'input', component: InputPageComponent },
  { path: 'textarea', component: TextareaPageComponent },
  { path: 'select', component: SelectPageComponent },
  { path: 'toggle', component: TogglePageComponent },
  { path: 'checkbox', component: CheckboxPageComponent },
  { path: 'radio', component: RadioPageComponent },
  { path: 'slider', component: SliderPageComponent },
  { path: 'tabs', component: TabsPageComponent },
  { path: 'avatar', component: AvatarPageComponent },
  { path: 'chip', component: ChipPageComponent },
  { path: 'icon', component: IconPageComponent },
  { path: 'progress', component: ProgressPageComponent },
  { path: 'loader', component: LoaderPageComponent },
  { path: 'stepper', component: StepperPageComponent },
  { path: 'dialog', component: DialogPageComponent },
  { path: 'drawer', component: DrawerPageComponent },
  { path: 'toast', component: ToastPageComponent },
  { path: 'tooltip', component: TooltipPageComponent },
  { path: 'alert', redirectTo: 'toast' },
  { path: 'form', component: FormPageComponent },
];
