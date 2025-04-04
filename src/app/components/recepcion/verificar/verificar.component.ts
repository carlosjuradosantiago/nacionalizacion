import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

interface Tramite {
  nroTramite: string;
  tipo: string;
  fechaRegistro: string;
  estado: string;
  administrado: string;
}

@Component({
  selector: 'app-verificar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TooltipModule
  ],
  template: `
    <div class="container">
      <div class="content-wrapper bg-white rounded-lg">
        <div class="content-header">
          <h1 class="text-2xl font-normal text-gray-900">Verificación de documentos</h1>
          <p class="text-gray-600 mt-1">Verificar los documentos de los trámites asignados para usted</p>
        </div>

        <div class="content-body">
          <div class="search-container">
            <div class="p-input-icon-left w-full lg:w-96">
              <i class="pi pi-search"></i>
              <input 
                type="text" 
                pInputText 
                [(ngModel)]="searchText"
                placeholder="Buscar por número, tipo o administrado..."
                class="w-full"
              >
            </div>
          </div>

          <div class="table-container">
            <table class="w-full">
              <thead>
                <tr>
                  <th>Nº TRÁMITE</th>
                  <th>TIPO</th>
                  <th>FECHA REGISTRO</th>
                  <th>ESTADO</th>
                  <th>ADMINISTRADO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let tramite of tramites">
                  <td>
                    <span class="tramite-number">{{tramite.nroTramite}}</span>
                  </td>
                  <td>
                    <span class="tramite-type">{{tramite.tipo}}</span>
                  </td>
                  <td>
                    <span class="date">{{tramite.fechaRegistro}}</span>
                  </td>
                  <td>
                    <span [class]="getStatusClass(tramite.estado)">
                      {{tramite.estado}}
                    </span>
                  </td>
                  <td>
                    <span class="administrado">{{tramite.administrado}}</span>
                  </td>
                  <td>
                    <button 
                      class="verify-button"
                      (click)="verificarTramite(tramite)"
                    >
                      <i class="pi pi-file-edit"></i>
                      Verificar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
    }

    .content-wrapper {
      background: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .content-header {
      padding: 1.5rem 2rem;
      border-bottom: 1px solid #E5E7EB;
    }

    .content-body {
      padding: 2rem;
    }

    .search-container {
      margin-bottom: 2rem;
    }

    :host ::ng-deep .p-input-icon-left {
      width: 100%;
      
      input {
        padding: 0.75rem 0.75rem 0.75rem 2.5rem;
        width: 100%;
        border: 1px solid #E2E8F0;
        border-radius: 6px;
        font-size: 0.875rem;
        color: #1a1a1a;
        transition: all 0.2s;
        
        &::placeholder {
          color: #94A3B8;
        }
        
        &:focus {
          border-color: #2563EB;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
        }
      }
      
      i {
        left: 0.75rem;
        color: #94A3B8;
      }
    }

    .table-container {
      margin-top: 1rem;
    }

    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
    }

    th {
      text-align: left;
      padding: 1rem;
      font-weight: 600;
      font-size: 0.75rem;
      color: #374151;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid #E5E7EB;
    }

    td {
      padding: 1rem;
      border-bottom: 1px solid #E5E7EB;
      font-size: 0.875rem;
    }

    tr:hover {
      background-color: #F9FAFB;
    }

    .tramite-number {
      color: #2563EB;
      font-weight: 500;
    }

    .tramite-type {
      color: #1F2937;
    }

    .date {
      color: #6B7280;
    }

    .administrado {
      color: #1F2937;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      
      &.pending {
        background: #FEF9C3;
        color: #854D0E;
      }
      
      &.in-process {
        background: #DBEAFE;
        color: #1E40AF;
      }
      
      &.completed {
        background: #DCF7E3;
        color: #166534;
      }
    }

    .verify-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: white;
      border: 1px solid #E2E8F0;
      border-radius: 6px;
      color: #2563EB;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.2s;
      cursor: pointer;

      &:hover {
        background: #F8FAFC;
        border-color: #2563EB;
      }

      i {
        font-size: 1rem;
        color: #2563EB;
      }
    }
  `]
})
export class VerificarComponent {
  searchText = '';

  tramites: Tramite[] = [
    {
      nroTramite: 'LM250090348',
      tipo: 'Obtención de nacionalidad peruana por naturalización',
      fechaRegistro: '12/07/2023',
      estado: 'Pendiente',
      administrado: 'John Smith'
    },
    {
      nroTramite: 'LM250090349',
      tipo: 'Prórroga de residencia',
      fechaRegistro: '11/07/2023',
      estado: 'Pendiente',
      administrado: 'Maria Garcia'
    },
    {
      nroTramite: 'LM250090350',
      tipo: 'Cambio de calidad migratoria',
      fechaRegistro: '10/07/2023',
      estado: 'Pendiente',
      administrado: 'Carlos Rodriguez'
    },
    {
      nroTramite: 'LM250090351',
      tipo: 'Permiso especial de viaje',
      fechaRegistro: '09/07/2023',
      estado: 'Pendiente',
      administrado: 'Ana Torres'
    },
    {
      nroTramite: 'LM250090352',
      tipo: 'Certificado de movimiento migratorio',
      fechaRegistro: '08/07/2023',
      estado: 'En proceso',
      administrado: 'Roberto Méndez'
    }
  ];

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pendiente':
        return 'status-badge pending';
      case 'en proceso':
        return 'status-badge in-process';
      case 'completado':
        return 'status-badge completed';
      default:
        return 'status-badge pending';
    }
  }

  verificarTramite(tramite: Tramite) {
    // Implement verification logic
    console.log('Verificando trámite:', tramite);
  }
}