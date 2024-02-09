import { Component } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {

  public nuevo;
  public cliente;

  public data = {
    nombre:'',
    rif:'',
    codigo:'',
    direccion:'',
    contactos:[
    ],
    almacenes:[
    ]
  }

  nuevoProducto(){
    this.nuevo = true;
  }

  nuevoCliente(){
    this.cliente = true;
  }

  cerrar(){
    this.nuevo = false;
    this.cliente = false;
  }

  GuardarCiente(){
    this.data = {
      nombre:'',
      rif:'',
      codigo:'',
      direccion:'',
      contactos:[
      ],
      almacenes:[
      ]
    }
    this.nuevo = false;
    this.cliente = false;
  }

}
