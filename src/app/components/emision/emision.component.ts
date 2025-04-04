import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emision',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content-header">
      <h1>Emisión del Título</h1>
      <p>Gestión de emisión de títulos</p>
    </div>
  `
})
export class EmisionComponent {}