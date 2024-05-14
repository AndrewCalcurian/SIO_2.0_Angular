import { Component } from '@angular/core';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent {

  public mesActual;
  public yearActual;
  constructor(){
    const meses = ['Enero', 'Febrero', 'Marzo', 'Septiembre', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
                const fechaActual = new Date();
                this.mesActual = meses[fechaActual.getMonth()];
                this.yearActual = new Date().getFullYear();
  }



  public cliente = false; // Variable para controlar si se está buscando por cliente
public fecha = true; // Variable para controlar si se está buscando por fecha
public Info_clientes = [false, false]; // Array de booleanos para controlar la visualización de información adicional por cliente

// Función para buscar por cliente
buscarporCliente(){
  console.log('here is working'); // Imprimir mensaje en consola
  this.fecha = false; // Ocultar la búsqueda por fecha
  this.cliente = true; // Mostrar la búsqueda por cliente
}

// Función para buscar por fecha
buscarporFecha(){
  this.fecha = true; // Mostrar la búsqueda por fecha
  this.cliente = false; // Ocultar la búsqueda por cliente
}

// Función para mostrar información adicional por cliente
show_info(n){
  if(this.Info_clientes[n]){
    this.Info_clientes[n] = false; // Si la información está mostrándose, ocultarla
  } else {
    this.Info_clientes[n] = true; // Si la información está oculta, mostrarla
  }
}

}
