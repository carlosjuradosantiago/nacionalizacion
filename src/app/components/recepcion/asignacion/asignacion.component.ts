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
  selector: 'app-asignacion',
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
        Recepción / Asignación de trámites
      </div>

      <div class="header-section">
        <h1 class="text-2xl font-normal">Asignación de trámites</h1>
        <div class="search-section">
          <div class="search-container">
            <input 
              type="text" 
              [(ngModel)]="searchText" 
              placeholder="Buscar tipo trámite"
              class="search-input"
            />
            <i class="pi pi-search search-icon"></i>
          </div>
          <button class="assign-button" (click)="showAssignDialog()">
            Asignar trámites
          </button>
        </div>
      </div>

      <button class="advanced-search-btn" (click)="showAdvancedSearch = !showAdvancedSearch">
        <i class="pi pi-search"></i>
        Búsqueda Avanzada
      </button>

      <div class="advanced-search-form" *ngIf="showAdvancedSearch">
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
            >
          </div>
        </div>

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

        <div class="form-actions">
          <button class="clear-btn" (click)="clearAdvancedSearch()">
            Limpiar
          </button>
          <button class="search-btn" (click)="searchAdvanced()">
            Buscar
          </button>
        </div>
      </div>

      <div class="status-section">
        <div class="status-content">
          <div class="status-count">120 trámites por asignar</div>
          <div class="status-indicators">
            <div class="status-indicator">
              <i class="pi pi-check-circle status-icon success"></i>
              <span>Dentro del plazo (3)</span>
            </div>
            <div class="status-indicator">
              <i class="pi pi-clock status-icon warning"></i>
              <span>Plazo por vencer (4)</span>
            </div>
            <div class="status-indicator">
              <i class="pi pi-exclamation-triangle status-icon danger"></i>
              <span>Plazo vencido (3)</span>
            </div>
          </div>
        </div>
        <div class="status-actions">
          <button class="export-btn">
            <i class="pi pi-file-excel"></i>
            Exportar Excel
          </button>
          <button class="export-btn">
            <i class="pi pi-file-pdf"></i>
            Exportar PDF
          </button>
          <div class="view-toggle">
            <button class="view-btn" [class.active]="!isCardView" (click)="isCardView = false">
              <i class="pi pi-table"></i>
            </button>
            <button class="view-btn" [class.active]="isCardView" (click)="isCardView = true">
              <i class="pi pi-th-large"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Table View -->
      <div class="table-container" *ngIf="!isCardView">
        <table class="custom-table">
          <thead>
            <tr>
              <th class="w-12">
                <input type="checkbox" class="checkbox" />
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
                <input type="checkbox" class="checkbox" />
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
                <button class="assign-status-btn">Por Asignar</button>
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

      <!-- Card View -->
      <div class="cards-container" *ngIf="isCardView">
        <div class="card" *ngFor="let tramite of tramites" [attr.data-status]="tramite.status">
          <div class="card-header">
            <div class="card-status">
              <input type="checkbox" class="checkbox">
              <div class="card-id-group">
                <div class="card-id-row">
                  <i [class]="getStatusIcon(tramite.status)"></i>
                  <span class="card-id">{{tramite.nroTramite}}</span>
                </div>
                <ng-container [ngSwitch]="tramite.status">
                  <span class="time-status" *ngSwitchCase="'success'">Dentro del plazo - 00d 12h 58m</span>
                  <span class="time-status" *ngSwitchCase="'warning'">Por vencer - 00d 04h 22m</span>
                  <span class="time-status" *ngSwitchCase="'danger'">Plazo vencido - 02d 18h 33m</span>
                </ng-container>
              </div>
            </div>
            <div class="card-actions">
              <span class="status-badge">{{tramite.estado}}</span>
            </div>
          </div>
          
          <div class="card-content">
            <div class="tramite-title">{{tramite.tipoTramite}}</div>
            
            <div class="card-row">
              <span class="card-label">Oficina:</span>
              <span class="card-value">Lima - Área: Naturalización</span>
            </div>
            
            <div class="card-row">
              <span class="card-label">Administrado:</span>
              <div class="card-value">
                {{tramite.administrado.nombre}}
                <div class="nationality">{{tramite.administrado.nacionalidad}}</div>
              </div>
            </div>

            <div class="registro-row">
              <span class="registro-label">Registro:</span>
              <span class="registro-value">{{tramite.fechaRegistro}}</span>
            </div>

            <button class="ver-detalles-btn">Ver detalles</button>
          </div>

          <div class="card-warning warning" *ngIf="tramite.status === 'warning'">
            ¡Atención prioritaria!
          </div>
          <div class="card-warning danger" *ngIf="tramite.status === 'danger'">
            ¡Atención urgente!
          </div>
        </div>
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

      <!-- Updated Dialog component -->
      <p-dialog 
        [(visible)]="displayAssignDialog" 
        [modal]="true"
        [style]="{width: '450px', borderRadius: '8px'}"
        [draggable]="false"
        [resizable]="false"
        styleClass="assign-dialog"
        [closable]="false"
        [closeOnEscape]="true"
        (onHide)="onDialogHide()"
      >
        <ng-template pTemplate="header">
          <div class="dialog-header">
            <h2>Asignar trámites</h2>
            <button class="close-button" (click)="displayAssignDialog = false">
              <i class="pi pi-times"></i>
            </button>
          </div>
        </ng-template>
        
        <div class="dialog-content">
          <p class="dialog-subtitle">Seleccione el verificador al que desea asignar 1 trámite.</p>
          
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
            <div class="verificador-item" *ngFor="let verificador of verificadores" [class.selected]="selectedVerificador === verificador">
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
            <button class="cancel-btn" (click)="displayAssignDialog = false">
              Cancelar
            </button>
            <button class="assign-btn" [disabled]="!selectedVerificador" (click)="assignTramites()">
              Asignar trámites
            </button>
          </div>
        </ng-template>
      </p-dialog>
    </div>
  `,
  styles: [`
    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .search-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .search-container {
      position: relative;
    }

    .search-input {
      width: 300px;
      height: 36px;
      padding: 8px 12px 8px 36px;
      border: 1px solid #E2E8F0;
      border-radius: 4px;
      font-size: 14px;
      background: white;
    }

    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #94A3B8;
      font-size: 14px;
    }

    .assign-button {
      height: 36px;
      padding: 0 16px;
      background: #4299E1;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .assign-button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
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

    .advanced-search-form {
      background: white;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 16px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

    .status-actions {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .export-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border: 1px solid #E0E0E0;
      background: white;
      border-radius: 4px;
      color: #666;
      font-size: 14px;
      cursor: pointer;
    }

    .view-toggle {
      display: flex;
      gap: 4px;
    }

    .view-btn {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #E0E0E0;
      background: white;
      border-radius: 4px;
      color: #666;
      cursor: pointer;
    }

    .view-btn.active {
      background: #2196F3;
      color: white;
      border-color: #2196F3;
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

    .nationality {
      color: #999;
      font-size: 12px;
      margin-top: 2px;
    }

    .assign-status-btn {
      background: #F5F5F5;
      color: #666;
      padding: 6px 12px;
      border-radius: 4px;
      border: none;
      font-size: 14px;
      cursor: pointer;
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

    .cards-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 16px;
      padding: 16px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .card {
      border-width: 2px 2px 2px 6px;
      border-style: solid;
      border-color: #E0E0E0;
      border-radius: 8px;
      overflow: hidden;
      background: white;
      position: relative;
    }

    .card[data-status="success"] {
      border-color: #4CAF50;
    }

    .card[data-status="warning"] {
      border-color: #FF9800;
    }

    .card[data-status="danger"] {
      border-color: #F44336;
    }

    .card-header {
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-status {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }

    .card-id {
      font-weight: 700;
      font-size: 16px;
    }

    .card-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .card-content {
      padding: 16px;
      position: relative;
      padding-bottom: 48px;
    }

    .card-row {
      margin-bottom: 12px;
    }

    .card-row:last-child {
      margin-bottom: 0;
    }

    .card-label {
      display: block;
      color: #666;
      font-size: 14px;
      margin-bottom: 4px;
    }

    .card-value {
      color: #333;
      font-size: 14px;
    }

    .card-footer {
      padding: 16px;
      border-top: 1px solid #E0E0E0;
      display: flex;
      justify-content: flex-end;
    }

    .card-warning {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 600;
      text-align: left;
    }

    .card-warning.warning {
      background: #FFF3E0;
      color: #E65100;
    }

    .card-warning.danger {
      background: #FFEBEE;
      color: #C62828;
    }

    .card-id-section {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }

    .card-time-status {
      color: #666;
      font-size: 14px;
      margin-bottom: 16px;
    }

    .ver-detalles-btn {
      position: absolute;
      right: 16px;
      bottom: 40px;
      padding: 8px 16px;
      background: #fff;
      border: 1px solid #0066CC;
      color: #0066CC;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
      width: auto;
      text-align: center;
    }

    .ver-detalles-btn:hover {
      background: #E3F2FD;
    }

    .card-warning {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 600;
      text-align: left;
    }

    .card-warning.warning {
      background: #FFF3E0;
      color: #E65100;
    }

    .card-warning.danger {
      background: #FFEBEE;
      color: #C62828;
    }

    .time-status {
      color: #666;
      font-size: 14px;
    }

    .card-id-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .card-id-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .card-status {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }

    .time-status {
      color: #666;
      font-size: 14px;
      margin-left: 32px;
    }

    .tramite-title {
      font-size: 16px;
      font-weight: 700;
      color: #333;
      margin-bottom: 16px;
    }

    .registro-row {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 12px;
    }

    .registro-label {
      color: #666;
      font-size: 14px;
    }

    .registro-value {
      color: #333;
      font-size: 14px;
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

        .p-datepicker {
          width: 280px !important;
          min-width: 280px !important;
          
          table {
            font-size: 13px;
            margin: 0.3rem 0;
            
            th {
              padding: 0.3rem;
            }
            
            td {
              padding: 0.3rem;
              
              > span {
                width: 28px;
                height: 28px;
              }
            }
          }
          
          .p-datepicker-header {
            padding: 0.3rem;
            font-size: 14px;
            
            .p-datepicker-title {
              .p-datepicker-month,
              .p-datepicker-year {
                font-size: 14px;
              }
            }
          }
        }
      }

      .p-inputtext {
        padding: 8px 12px;
      }
    }

    :host ::ng-deep .assign-dialog {
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

    .assign-btn {
      padding: 8px 16px;
      background: #2196F3;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: #1976D2;
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  `]
})
export class AsignacionComponent {
  searchText = '';
  showAdvancedSearch = false;
  isCardView = false;
  displayAssignDialog = false;
  searchVerificador = '';
  selectedVerificador: Verificador | null = null;

  tiposTramite: DropdownOption[] = [
    { label: 'Naturalización', value: 'naturalizacion' },
    { label: 'Doble Nacionalidad', value: 'doble_nacionalidad' }
  ];

  tiposDocumento: DropdownOption[] = [
    { label: 'DNI', value: 'dni' },
    { label: 'Carnet de Extranjería', value: 'carnet' },
    { label: 'Pasaporte', value: 'pasaporte' }
  ];

  selectedTipoTramite: string | null = null;
  selectedTipoDocumento: string | null = null;

  tramites: Tramite[] = [
    {
      nroTramite: 'LM25009000',
      tipoTramite: 'Obtención de nacionalidad peruana por naturalización',
      fechaRegistro: '28 feb. 2023, 16:33:00',
      estado: 'Pendiente',
      administrado: {
        nombre: 'Jorge Peralta Ruiz',
        nacionalidad: 'Venezolano'
      },
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

  clearAdvancedSearch() {
    this.selectedTipoTramite = null;
    this.selectedTipoDocumento = null;
  }

  searchAdvanced() {
    // Implement advanced search logic
  }

  showAssignDialog() {
    this.displayAssignDialog = true;
  }

  onDialogHide() {
    this.selectedVerificador = null;
    this.searchVerificador = '';
  }

  selectVerificador(verificador: Verificador) {
    this.selectedVerificador = verificador;
  }

  assignTramites() {
    if (this.selectedVerificador) {
      // Implement assign logic
      this.displayAssignDialog = false;
    }
  }
}