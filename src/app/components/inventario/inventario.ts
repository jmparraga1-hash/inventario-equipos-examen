// inventario.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquiposService, Equipo } from '../../services/equipos';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css'
})
export class Inventario implements OnInit {
  equipos: Equipo[] = [];
  codigoBusqueda: string = '';
  equipoEncontrado: Equipo | null = null;
  mensaje: string = '';

  nuevoEquipo: Equipo = {
    codigo: '', nombre: '', categoria: '', laboratorio: '', estado: 'Disponible', responsable: ''
  };

  constructor(private equiposService: EquiposService) { }

  ngOnInit(): void {
    this.cargarEquipos();
  }

  // Consultar todos los equipos
  cargarEquipos(): void {
    this.equiposService.obtenerEquipos().subscribe({
      next: (data) => {
        this.equipos = data;
        this.mensaje = '';
        localStorage.setItem('equipos_cache', JSON.stringify(data));
      },
      error: (err) => {
        console.error('Error al cargar equipos, usando caché local', err);
        const cache = localStorage.getItem('equipos_cache');
        if (cache) {
          this.equipos = JSON.parse(cache);
          this.mensaje = 'Sin conexión: mostrando última información guardada';
        } else {
          this.mensaje = 'Sin conexión y sin datos guardados previamente';
        }
      }
    });
  }

  // Buscar equipo por código
  buscarEquipo(): void {
    if (!this.codigoBusqueda) return;
    this.equiposService.obtenerEquipoPorCodigo(this.codigoBusqueda).subscribe({
      next: (data) => { this.equipoEncontrado = data; this.mensaje = ''; },
      error: () => { this.equipoEncontrado = null; this.mensaje = 'Equipo no encontrado'; }
    });
  }

  // Registrar nuevo equipo
  registrarEquipo(): void {
    this.equiposService.registrarEquipo(this.nuevoEquipo).subscribe({
      next: () => {
        this.mensaje = 'Equipo registrado con éxito';
        this.cargarEquipos();
        this.nuevoEquipo = { codigo: '', nombre: '', categoria: '', laboratorio: '', estado: 'Disponible', responsable: '' };
      },
      error: (err) => this.mensaje = 'Error: ' + (err.error?.mensaje || 'no se pudo registrar')
    });
  }

  // Actualizar estado
  actualizarEstado(codigo: string, nuevoEstado: string): void {
    this.equiposService.actualizarEstado(codigo, nuevoEstado).subscribe({
      next: () => this.cargarEquipos(),
      error: (err) => console.error(err)
    });
  }
}