import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { CheckboxModule, CheckboxChangeEvent } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-asignacion',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    PaginatorModule,
    CheckboxModule,
    CalendarModule
  ],
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.scss']
})
export class AsignacionComponent implements OnInit {
  
  // Datos de trámites
  tramites: any[] = [];
  
  // Filtros
  tipoTramite: string = '';
  numeroTramite: string = '';
  
  // Filtros avanzados
  mostrarBusquedaAvanzada: boolean = false;
  fechaInicio: Date | null = null;
  fechaFin: Date | null = null;
  tipoDocumento: string = '';
  numeroDocumento: string = '';
  
  // Paginación
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 120;
  
  // Estadísticas
  tramitesPendientes: number = 120;
  tramitesDentroPlazo: number = 4;
  tramitesPorVencer: number = 1;
  tramitesVencidos: number = 5;
  
  // Selección
  tramitesSeleccionados: any[] = [];
  seleccionarTodos: boolean = false;
  
  constructor() { }
  
  ngOnInit() {
    // Cargar datos de prueba
    this.cargarDatosDePrueba();
  }
  
  cargarDatosDePrueba() {
    // Simular datos para la tabla
    for(let i = 0; i < 10; i++) {
      const estado = i % 3 === 0 ? 'vencido' : (i % 4 === 0 ? 'por_vencer' : 'dentro_plazo');
      
      this.tramites.push({
        id: `LM2509900${i}`,
        tipo: 'Obtención de nacionalidad peruana por naturalización',
        fecha: '28 feb. 2023, 16:33:00',
        estado: 'Pendiente',
        plazo: estado,
        administrado: {
          nombre: 'Jorge Peralta Ruiz',
          nacionalidad: 'Peruano'
        }
      });
    }
  }
  
  buscar() {
    // Implementar lógica de búsqueda
    console.log('Buscando con filtros:', { 
      tipoTramite: this.tipoTramite, 
      numeroTramite: this.numeroTramite,
      // Incluir filtros avanzados si están visibles
      ...(this.mostrarBusquedaAvanzada && {
        fechaInicio: this.fechaInicio,
        fechaFin: this.fechaFin,
        tipoDocumento: this.tipoDocumento,
        numeroDocumento: this.numeroDocumento
      })
    });
  }
  
  limpiar() {
    this.tipoTramite = '';
    this.numeroTramite = '';
    // Limpiar también los campos de búsqueda avanzada
    this.fechaInicio = null;
    this.fechaFin = null;
    this.tipoDocumento = '';
    this.numeroDocumento = '';
  }
  
  busquedaAvanzada() {
    this.mostrarBusquedaAvanzada = !this.mostrarBusquedaAvanzada;
  }
  
  asignarTramites() {
    // Implementar lógica para asignar trámites
    console.log('Asignando trámites seleccionados:', this.tramitesSeleccionados);
  }
  
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    // Implementar cambio de página
  }
  
  onSeleccionFilaChange(tramite: any, event: CheckboxChangeEvent) {
    if (event.checked) {
      this.tramitesSeleccionados.push(tramite);
    } else {
      this.tramitesSeleccionados = this.tramitesSeleccionados.filter(t => t.id !== tramite.id);
    }
  }
  
  onSeleccionarTodosChange(event: CheckboxChangeEvent) {
    this.seleccionarTodos = event.checked;
    this.tramitesSeleccionados = event.checked ? [...this.tramites] : [];
  }
  
  hayTramitesSeleccionados(): boolean {
    return this.tramitesSeleccionados.length > 0;
  }
} 