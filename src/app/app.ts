import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Inventario } from './components/inventario/inventario';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Inventario],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('inventario-frontend');
}