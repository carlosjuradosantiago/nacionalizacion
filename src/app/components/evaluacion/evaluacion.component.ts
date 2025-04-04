import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evaluacion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content-header">
      <h1>Evaluación</h1>
      <p>Evaluación de expedientes</p>
    </div>
  `
})
export class EvaluacionComponent {}