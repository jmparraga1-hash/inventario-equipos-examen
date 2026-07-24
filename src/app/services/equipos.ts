// equipos.ts
// Servicio encargado de consumir los Web Services del backend
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Equipo {
  id?: number;
  codigo: string;
  nombre: string;
  categoria: string;
  laboratorio: string;
  estado: string;
  responsable: string;
}

@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  private apiUrl = 'http://localhost:3000/api/equipos';

  constructor(private http: HttpClient) { }

  // Consultar todos los equipos
  obtenerEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.apiUrl);
  }

  // Consultar un equipo por código
  obtenerEquipoPorCodigo(codigo: string): Observable<Equipo> {
    return this.http.get<Equipo>(`${this.apiUrl}/${codigo}`);
  }

  // Registrar un nuevo equipo
  registrarEquipo(equipo: Equipo): Observable<any> {
    return this.http.post(this.apiUrl, equipo);
  }

  // Actualizar el estado de un equipo
  actualizarEstado(codigo: string, estado: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${codigo}/estado`, { estado });
  }
}