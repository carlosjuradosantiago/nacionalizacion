import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content-header">
      <h1>Consultas</h1>
      <p>Consulta de trámites</p>
    </div>
  `
})
export class ConsultasComponent {}