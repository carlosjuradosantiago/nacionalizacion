import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';

interface Tramite {
  nroTramite: string;
  tipoTramite: string;
  fechaRegistro: string;
  estado: string;
  administrado: {
    nombre: string;
    nacionalidad: string;
  };
  asignado: string;
  status: 'success' | 'warning' | 'danger';
}

interface DropdownOption {
  label: string;
  value: string;
}

interface Verificador {
  nombre: string;
  rol: string;
  tramites: number;
}

@Component({
  selector: 'app-reasignacion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    CalendarModule,
    DropdownModule,
    DialogModule
  ],
  template: `
    <div class="p-4">
      <div class="breadcrumb text-gray-600 mb-4">
        Recepción / Reasignación de trámites
      </div>

      <div class="header-section">
        <h1 class="text-2xl font-normal">Reasignación de trámites</h1>
      </div>

      <div class="search-form">
        <div class="form-row">
          <div class="form-group">
            <label>Tipo de trámite</label>
            <p-dropdown 
              [options]="tiposTramite" 
              placeholder="Ingrese tipo de trámite"
              [style]="{'width': '100%'}"
              styleClass="w-full"
              [(ngModel)]="selectedTipoTramite"
            ></p-dropdown>
          </div>
          <div class="form-group">
            <label>Número de trámite</label>
            <input 
              type="text" 
              pInputText 
              placeholder="Ingrese número de trámite"
              class="w-full"
              [(ngModel)]="searchText"
            >
          </div>
          <div class="form-group">
            <label>Verificador</label>
            <p-dropdown 
              [options]="verificadoresOptions" 
              placeholder="Seleccionar verificador"
              [style]="{'width': '100%'}"
              styleClass="w-full"
              [(ngModel)]="selectedVerificador"
            ></p-dropdown>
          </div>
        </div>

        <button class="advanced-search-btn" (click)="showAdvancedSearch = !showAdvancedSearch">
          <i class="pi pi-search"></i>
          Búsqueda Avanzada
        </button>

        <div class="advanced-search-form" *ngIf="showAdvancedSearch">
          <div class="form-row">
            <div class="form-group">
              <label>Fecha inicio</label>
              <p-calendar 
                placeholder="dd/mm/aaaa"
                [showIcon]="true"
                styleClass="w-full"
              ></p-calendar>
            </div>
            <div class="form-group">
              <label>Fecha fin</label>
              <p-calendar 
                placeholder="dd/mm/aaaa"
                [showIcon]="true"
                styleClass="w-full"
              ></p-calendar>
            </div>
            <div class="form-group">
              <label>Tipo de documento</label>
              <p-dropdown 
                [options]="tiposDocumento" 
                placeholder="Seleccionar"
                [style]="{'width': '100%'}"
                styleClass="w-full"
                [(ngModel)]="selectedTipoDocumento"
              ></p-dropdown>
            </div>
            <div class="form-group">
              <label>Número de documento</label>
              <input 
                type="text" 
                pInputText 
                placeholder="Ingrese número de documento"
                class="w-full"
              >
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button class="clear-btn" (click)="clearSearch()">
            Limpiar
          </button>
          <button class="search-btn" (click)="search()">
            Buscar
          </button>
        </div>
      </div>

      <div class="status-section">
        <div class="status-content">
          <div class="status-count">120 trámites asignados</div>
          <div class="status-indicators">
            <div class="status-indicator">
              <i class="pi pi-check-circle status-icon success"></i>
              <span>Dentro del plazo (6)</span>
            </div>
            <div class="status-indicator">
              <i class="pi pi-clock status-icon warning"></i>
              <span>Plazo por vencer (3)</span>
            </div>
            <div class="status-indicator">
              <i class="pi pi-exclamation-triangle status-icon danger"></i>
              <span>Plazo vencido (1)</span>
            </div>
          </div>
        </div>
        <div class="status-actions">
          <button class="reassign-btn" [disabled]="!selectedTramites.length" (click)="showReassignDialog()">
            Reasignar trámites
          </button>
        </div>
      </div>

      <div class="table-container">
        <table class="custom-table">
          <thead>
            <tr>
              <th class="w-12">
                <input type="checkbox" class="checkbox" (change)="toggleAllTramites($event)" />
              </th>
              <th>N° DE TRÁMITE</th>
              <th>TIPO DE TRÁMITE</th>
              <th>FECHA DE REGISTRO</th>
              <th>ESTADO</th>
              <th>ADMINISTRADO</th>
              <th>ASIGNADO</th>
              <th>ACCIÓN</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let tramite of tramites">
              <td>
                <input 
                  type="checkbox" 
                  class="checkbox" 
                  [checked]="isSelected(tramite)"
                  (change)="toggleTramite(tramite)"
                />
              </td>
              <td>
                <div class="flex items-center gap-2">
                  <i [class]="getStatusIcon(tramite.status)"></i>
                  {{tramite.nroTramite}}
                </div>
              </td>
              <td>{{tramite.tipoTramite}}</td>
              <td>{{tramite.fechaRegistro}}</td>
              <td>
                <span class="status-badge">{{tramite.estado}}</span>
              </td>
              <td>
                <div>
                  {{tramite.administrado.nombre}}
                  <div class="nationality">{{tramite.administrado.nacionalidad}}</div>
                </div>
              </td>
              <td>
                <span class="assigned-badge">{{tramite.asignado}}</span>
              </td>
              <td>
                <button class="action-btn">
                  <i class="pi pi-search"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination">
        <span class="pagination-info">Mostrando 1 a 10 de 120 resultados</span>
        <div class="pagination-controls">
          <button class="page-btn"><i class="pi pi-angle-left"></i></button>
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
          <span class="page-dots">...</span>
          <button class="page-btn">12</button>
          <button class="page-btn"><i class="pi pi-angle-right"></i></button>
        </div>
      </div>

      <!-- Reassign Dialog -->
      <p-dialog 
        [(visible)]="displayReassignDialog" 
        [modal]="true"
        [style]="{width: '450px', borderRadius: '8px'}"
        [draggable]="false"
        [resizable]="false"
        styleClass="reassign-dialog"
        [closable]="false"
        [closeOnEscape]="true"
        (onHide)="onDialogHide()"
      >
        <ng-template pTemplate="header">
          <div class="dialog-header">
            <h2>Reasignar trámites</h2>
            <button class="close-button" (click)="displayReassignDialog = false">
              <i class="pi pi-times"></i>
            </button>
          </div>
        </ng-template>
        
        <div class="dialog-content">
          <p class="dialog-subtitle">Seleccione el verificador al que desea reasignar {{selectedTramites.length}} trámite(s).</p>
          
          <div class="search-field">
            <div class="p-input-icon-left w-full">
              <i class="pi pi-search"></i>
              <input 
                type="text" 
                [(ngModel)]="searchVerificador"
                placeholder="Buscar verificador"
                class="search-input"
              />
            </div>
          </div>

          <div class="verificadores-list">
            <div class="verificador-item" *ngFor="let verificador of verificadores" [class.selected]="selectedNewVerificador === verificador">
              <div class="verificador-info" (click)="selectVerificador(verificador)">
                <i class="pi pi-user"></i>
                <div class="verificador-details">
                  <span class="verificador-name">{{verificador.nombre}}</span>
                  <span class="verificador-role">{{verificador.rol}}</span>
                </div>
                <span class="tramites-count" [class.warning]="verificador.tramites > 10">
                  {{verificador.tramites}} trámites
                </span>
              </div>
            </div>
          </div>
        </div>

        <ng-template pTemplate="footer">
          <div class="dialog-footer">
            <button class="cancel-btn" (click)="displayReassignDialog = false">
              Cancelar
            </button>
            <button class="reassign-btn" [disabled]="!selectedNewVerificador" (click)="reassignTramites()">
              Reasignar trámites
            </button>
          </div>
        </ng-template>
      </p-dialog>
    </div>
  `,
  styles: [`
    .search-form {
      background: white;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 16px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-group label {
      font-size: 14px;
      color: #333;
      font-weight: 500;
    }

    .advanced-search-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border: 1px solid #2196F3;
      color: #2196F3;
      background: white;
      border-radius: 4px;
      font-size: 14px;
      margin-bottom: 16px;
      cursor: pointer;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
    }

    .clear-btn {
      padding: 8px 24px;
      border: 1px solid #ccc;
      background: white;
      color: #666;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .clear-btn:hover {
      background: #f5f5f5;
    }

    .search-btn {
      padding: 8px 24px;
      background: #0066cc;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .search-btn:hover {
      background: #0052a3;
    }

    .status-section {
      background: white;
      border-radius: 8px;
      padding: 16px 20px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .status-content {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .status-count {
      font-weight: 600;
      font-size: 18px;
      color: #1a1a1a;
    }

    .status-indicators {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #666;
    }

    .status-icon {
      font-size: 16px;
      margin-right: 4px;
    }

    .status-icon.success {
      color: #4CAF50;
    }

    .status-icon.warning {
      color: #FF9800;
    }

    .status-icon.danger {
      color: #F44336;
    }

    .reassign-btn {
      padding: 8px 16px;
      background: #4299E1;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .reassign-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .table-container {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .custom-table {
      width: 100%;
      border-collapse: collapse;
    }

    .custom-table th {
      background: white;
      padding: 12px 16px;
      text-align: left;
      font-weight: 600;
      color: #333;
      border-bottom: 1px solid #E0E0E0;
      font-size: 16px;
    }

    .custom-table td {
      padding: 12px 16px;
      border-bottom: 1px solid #E0E0E0;
      color: #666;
      font-size: 16px;
    }

    .custom-table td:nth-child(2) {
      font-weight: 700;
    }

    .checkbox {
      width: 16px;
      height: 16px;
      border-radius: 4px;
      border: 1px solid #E0E0E0;
      cursor: pointer;
    }

    .status-badge {
      display: inline-block;
      padding: 4px 8px;
      background: #FEF9C3;
      color: #854D0E;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 700;
    }

    .assigned-badge {
      display: inline-block;
      padding: 4px 8px;
      background: #E3F2FD;
      color: #0066CC;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }

    .nationality {
      color: #999;
      font-size: 12px;
      margin-top: 2px;
    }

    .action-btn {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #E0E0E0;
      background: white;
      border-radius: 50%;
      color: #666;
      cursor: pointer;
    }

    .pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-top: 1px solid #E0E0E0;
    }

    .pagination-info {
      color: #666;
      font-size: 14px;
    }

    .pagination-controls {
      display: flex;
      gap: 4px;
    }

    .page-btn {
      min-width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #E0E0E0;
      background: white;
      border-radius: 4px;
      color: #666;
      font-size: 14px;
      cursor: pointer;
    }

    .page-btn.active {
      background: #2196F3;
      color: white;
      border-color: #2196F3;
    }

    .page-dots {
      display: flex;
      align-items: center;
      padding: 0 8px;
      color: #666;
    }

    :host ::ng-deep {
      .p-dropdown {
        width: 100%;
        .p-dropdown-label {
          padding: 8px 12px;
        }
      }

      .p-calendar {
        width: 100%;
        .p-inputtext {
          padding: 8px 12px;
        }
      }

      .p-inputtext {
        padding: 8px 12px;
      }

      .reassign-dialog {
        .p-dialog-header {
          padding: 0;
          border-bottom: none;
        }

        .p-dialog-content {
          padding: 0;
          border-radius: 8px;
        }

        .p-dialog-footer {
          padding: 0;
          border-top: none;
        }
      }
    }

    .dialog-header {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid #E0E0E0;
      position: relative;

      h2 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #333;
      }

      .close-button {
        position: absolute;
        right: 1rem;
        top: 1rem;
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        padding: 4px;
        
        &:hover {
          color: #333;
        }
      }
    }

    .dialog-content {
      padding: 1.5rem;
    }

    .dialog-subtitle {
      margin: 0 0 1.5rem;
      color: #666;
      font-size: 14px;
    }

    .search-field {
      margin-bottom: 1.5rem;

      .search-input {
        width: 100%;
        height: 36px;
        padding: 8px 12px 8px 36px;
        border: 1px solid #E2E8F0;
        border-radius: 4px;
        font-size: 14px;
        background: white;
      }
    }

    .verificadores-list {
      max-height: 300px;
      overflow-y: auto;
    }

    .verificador-item {
      padding: 12px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: #F8F9FA;
      }

      &.selected {
        background: #E3F2FD;
      }
    }

    .verificador-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .verificador-details {
      flex: 1;
    }

    .verificador-name {
      display: block;
      font-weight: 500;
      color: #333;
      font-size: 14px;
    }

    .verificador-role {
      display: block;
      color: #666;
      font-size: 12px;
      margin-top: 2px;
    }

    .tramites-count {
      font-size: 12px;
      color: #666;

      &.warning {
        color: #FF9800;
      }
    }

    .dialog-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid #E0E0E0;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    .cancel-btn {
      padding: 8px 16px;
      border: 1px solid #E0E0E0;
      background: white;
      color: #666;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: #F8F9FA;
      }
    }
  `]
})
export class ReasignacionComponent {
  searchText = '';
  showAdvancedSearch = false;
  displayReassignDialog = false;
  searchVerificador = '';
  selectedTramites: Tramite[] = [];
  selectedNewVerificador: Verificador | null = null;

  tiposTramite: DropdownOption[] = [
    { label: 'Naturalización', value: 'naturalizacion' },
    { label: 'Doble Nacionalidad', value: 'doble_nacionalidad' }
  ];

  tiposDocumento: DropdownOption[] = [
    { label: 'DNI', value: 'dni' },
    { label: 'Carnet de Extranjería', value: 'carnet' },
    { label: 'Pasaporte', value: 'pasaporte' }
  ];

  verificadoresOptions: DropdownOption[] = [
    { label: 'Ana María Sánchez', value: 'ana' },
    { label: 'Juan Carlos Pérez', value: 'juan' },
    { label: 'Luis Alberto Torres', value: 'luis' }
  ];

  selectedTipoTramite: string | null = null;
  selectedTipoDocumento: string | null = null;
  selectedVerificador: string | null = null;

  tramites: Tramite[] = [
    {
      nroTramite: 'LM25009000',
      tipoTramite: 'Obtención de nacionalidad peruana por naturalización',
      fechaRegistro: '28 feb. 2023, 16:33:00',
      estado: 'Pendiente',
      administrado: {
        nombre: 'Jorge Peralta Ruiz',
        nacionalidad: 'Peruano'
      },
      asignado: 'Sebastián Ramírez',
      status: 'success'
    },
    {
      nroTramite: 'LM25009001',
      tipoTramite: 'Obtención de nacionalidad peruana por naturalización',
      fechaRegistro: '28 feb. 2023, 16:33:00',
      estado: 'Pendiente',
      administrado: {
        nombre: 'María González López',
        nacionalidad: 'Colombiana'
      },
      asignado: 'Sebastián Ramírez',
      status: 'warning'
    },
    {
      nroTramite: 'LM25009002',
      tipoTramite: 'Obtención de nacionalidad peruana por naturalización',
      fechaRegistro: '28 feb. 2023, 16:33:00',
      estado: 'Pendiente',
      administrado: {
        nombre: 'Carlos Rodríguez Silva',
        nacionalidad: 'Argentino'
      },
      asignado: 'Sebastián Ramírez',
      status: 'danger'
    }
  ];

  verificadores: Verificador[] = [
    {
      nombre: 'Ana María Sánchez',
      rol: 'Verificador Senior',
      tramites: 8
    },
    {
      nombre: 'Juan Carlos Pérez',
      rol: 'Verificador',
      tramites: 12
    },
    {
      nombre: 'Luis Alberto Torres',
      rol: 'Verificador',
      tramites: 5
    }
  ];

  getStatusIcon(status: string): string {
    switch (status) {
      case 'success':
        return 'pi pi-check-circle text-green-500';
      case 'warning':
        return 'pi pi-clock text-yellow-500';
      case 'danger':
        return 'pi pi-exclamation-triangle text-red-500';
      default:
        return 'pi pi-info-circle text-blue-500';
    }
  }

  clearSearch() {
    this.selectedTipoTramite = null;
    this.selectedTipoDocumento = null;
    this.selectedVerificador = null;
    this.searchText = '';
  }

  search() {
    // Implement search logic
  }

  showReassignDialog() {
    this.displayReassignDialog = true;
  }

  onDialogHide() {
    this.selectedNewVerificador = null;
    this.searchVerificador = '';
  }

  selectVerificador(verificador: Verificador) {
    this.selectedNewVerificador = verificador;
  }

  reassignTramites() {
    if (this.selectedNewVerificador) {
      // Implement reassign logic
      this.displayReassignDialog = false;
    }
  }

  toggleAllTramites(event: any) {
    if (event.target.checked) {
      this.selectedTramites = [...this.tramites];
    } else {
      this.selectedTramites = [];
    }
  }

  toggleTramite(tramite: Tramite) {
    const index = this.selectedTramites.indexOf(tramite);
    if (index === -1) {
      this.selectedTramites.push(tramite);
    } else {
      this.selectedTramites.splice(index, 1);
    }
  }

  isSelected(tramite: Tramite): boolean {
    return this.selectedTramites.includes(tramite);
  }
}