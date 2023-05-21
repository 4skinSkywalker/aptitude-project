import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardNavbarComponent } from './layout/navbar/navbar.component';
import { DashboardSidebarComponent } from './layout/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { 
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'practice', pathMatch: 'full' },
      {
        path: 'practice',
        loadChildren: () =>
          import('./features/practice/practice.module').then(m => m.PracticeModule)
      },
      {
        path: 'adaptive',
        loadChildren: () =>
          import('./features/adaptive/adaptive.module').then(m => m.AdaptiveModule)
      }
    ]
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardNavbarComponent,
    DashboardSidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class DashboardModule { }
