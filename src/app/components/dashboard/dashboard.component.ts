import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ProgressBarModule],
  template: `
    <div class="content-header">
      <h1>Dashboard</h1>
      <p>Bienvenido al Sistema de Nacionalización</p>
    </div>

    <div class="dashboard-stats">
      <div class="stat-card">
        <div class="stat-change positive">
          <i class="pi pi-arrow-up"></i> 12% desde el mes pasado
        </div>
        <div class="stat-icon document">
          <i class="pi pi-file"></i>
        </div>
        <div class="stat-info">
          <h3>Total de trámites</h3>
          <div class="stat-number">356</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-subtitle">120 trámites por asignar</div>
        <div class="stat-icon process">
          <i class="pi pi-clock"></i>
        </div>
        <div class="stat-info">
          <h3>En proceso</h3>
          <div class="stat-number">128</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-change positive">
          <i class="pi pi-arrow-up"></i> 8% desde el mes pasado
        </div>
        <div class="stat-icon completed">
          <i class="pi pi-check-circle"></i>
        </div>
        <div class="stat-info">
          <h3>Completados</h3>
          <div class="stat-number">196</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-change negative">
          <i class="pi pi-arrow-down"></i> 5% desde el mes pasado
        </div>
        <div class="stat-icon expired">
          <i class="pi pi-exclamation-triangle"></i>
        </div>
        <div class="stat-info">
          <h3>Vencidos</h3>
          <div class="stat-number">32</div>
        </div>
      </div>
    </div>

    <div class="dashboard-content">
      <div class="recent-procedures">
        <h2>Trámites recientes</h2>
        <div class="procedures-list">
          <div class="procedure-item" *ngFor="let procedure of recentProcedures">
            <div class="procedure-info">
              <h4>{{procedure.id}}</h4>
              <p>{{procedure.type}}</p>
            </div>
            <div class="procedure-time">
              <i class="pi pi-clock"></i>
              <span>{{procedure.time}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="monthly-progress">
        <h2>Progreso mensual</h2>
        <div class="progress-items">
          <div class="progress-item" *ngFor="let progress of monthlyProgress">
            <div class="progress-header">
              <span>{{progress.name}}</span>
              <span>{{progress.percentage}}%</span>
            </div>
            <p-progressBar [value]="progress.percentage"></p-progressBar>
          </div>

          <div class="progress-item processing-time">
            <div class="progress-header">
              <span>Tiempo promedio de procesamiento</span>
              <span>12 días</span>
            </div>
          </div>

          <div class="progress-item efficiency">
            <div class="progress-header">
              <span>Eficiencia general</span>
              <span class="efficiency-value">82%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  recentProcedures = [
    { id: 'LM250090348', type: 'Tipo Trámite: Naturalización', time: 'Hace 2 horas' },
    { id: 'LM250090347', type: 'Tipo Trámite: Naturalización', time: 'Hace 3 horas' },
    { id: 'LM250090346', type: 'Tipo Trámite: Naturalización', time: 'Hace 5 horas' },
    { id: 'LM250090345', type: 'Tipo Trámite: Naturalización', time: 'Hace 1 día' },
    { id: 'LM250090344', type: 'Tipo Trámite: Naturalización', time: 'Hace 1 día' }
  ];

  monthlyProgress = [
    { name: 'Trámites asignados', percentage: 78 },
    { name: 'Trámites evaluados', percentage: 62 },
    { name: 'Emisión de títulos', percentage: 45 },
    { name: 'Trámites cerrados', percentage: 35 }
  ];
}