import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { LogisticaApiService } from './services/logistica-api.service';
import { EstadoEnvio } from './models/logistica.model';

@Component({
  selector: 'app-logistica',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './logistica.component.html',
  styleUrl: './logistica.component.scss',
})
export class LogisticaComponent implements OnInit {
  readonly service   = inject(LogisticaApiService);
  readonly loading   = this.service.loading;
  readonly productos = this.service.productos;
  readonly envios    = this.service.envios;

  readonly productosConAlerta = computed(() => this.productos().filter(p => p.stock <= p.stockMinimo));

  readonly breadcrumbs = [
    { label: 'Inicio', route: '/dashboard' },
    { label: 'Logística' },
  ];

  readonly colsProductos = ['codigo', 'nombre', 'stock', 'stockMinimo', 'unidad', 'ubicacion'];
  readonly colsEnvios    = ['referencia', 'origen', 'destino', 'fecha', 'transportista', 'estado'];

  ngOnInit(): void {
    this.service.loadAll();
  }

  estadoLabel(e: EstadoEnvio): string {
    return { pendiente: 'Pendiente', en_transito: 'En tránsito', entregado: 'Entregado', devuelto: 'Devuelto' }[e] ?? e;
  }

  estadoColor(e: EstadoEnvio): string {
    return { pendiente: 'warning', en_transito: 'info', entregado: 'success', devuelto: 'error' }[e] ?? 'info';
  }

  isStockCritico(stock: number, minimo: number): boolean {
    return stock <= minimo;
  }
}
