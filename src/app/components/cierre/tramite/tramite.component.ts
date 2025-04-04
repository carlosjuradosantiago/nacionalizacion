import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tramite',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content-header">
      <h1>Cierre de Trámite</h1>
      <p>Cierre de trámites</p>
    </div>
  `
})
export class TramiteComponent {}