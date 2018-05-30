import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SelectComponent} from './select/select.component';
import {WinnerComponent} from './winner.component';

const routes: Routes = [
  {
    path: '',
    component: SelectComponent,
  },
  {
    path: 'show',
    component: WinnerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WinnerRoutingModule {
}
