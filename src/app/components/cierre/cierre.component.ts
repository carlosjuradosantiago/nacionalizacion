import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cierre',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content-header">
      <h1>Cierre</h1>
      <p>Gestión de cierre de trámites</p>
    </div>
  `
})
export class CierreComponent {}