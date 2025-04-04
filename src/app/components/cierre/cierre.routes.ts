import { Routes } from '@angular/router';

export const CIERRE_ROUTES: Routes = [
  {
    path: 'tramite',
    loadComponent: () => import('./tramite/tramite.component').then(m => m.TramiteComponent)
  },
  {
    path: 'baja',
    loadComponent: () => import('./baja/baja.component').then(m => m.BajaComponent)
  }
];