import { Routes } from '@angular/router';

export const EMISION_ROUTES: Routes = [
  {
    path: 'generar',
    loadComponent: () => import('./generar/generar.component').then(m => m.GenerarComponent)
  },
  {
    path: 'registrar',
    loadComponent: () => import('./registrar/registrar.component').then(m => m.RegistrarComponent)
  }
];