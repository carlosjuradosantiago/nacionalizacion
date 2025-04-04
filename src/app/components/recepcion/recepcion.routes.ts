import { Routes } from '@angular/router';

export const RECEPCION_ROUTES: Routes = [
  {
    path: 'asignacion',
    loadComponent: () => import('./asignacion/asignacion.component').then(m => m.AsignacionComponent)
  },
  {
    path: 'reasignacion',
    loadComponent: () => import('./reasignacion/reasignacion.component').then(m => m.ReasignacionComponent)
  },
  {
    path: 'verificar',
    loadComponent: () => import('./verificar/verificar.component').then(m => m.VerificarComponent)
  }
];