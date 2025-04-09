import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'asignacion',
        loadComponent: () => import('./pages/asignacion/asignacion.component').then(c => c.AsignacionComponent)
      },
      {
        path: '',
        redirectTo: 'asignacion',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecepcionModule { } 