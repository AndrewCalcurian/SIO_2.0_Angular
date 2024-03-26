import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Producto } from 'src/app/compras/models/modelos-compra';
import { ClientesService } from 'src/app/services/clientes.service';
// import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {

  readonly VAPID_PUBLIC_KEY = "YOUR_SERVER_PUBLIC_KEY";

  constructor(public clientes:ClientesService) {
  }

  public nuevo;
  public cliente;
  public editar = false;

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

  public producto:Producto = {
    cliente:'',
    producto:'',
    codigo:'',
    tamano_desplegado:[],
    tamano_cerrado:[],
    diseno:'',
    sustrato:[],
    tintas:[],
    barnices:[],
    archivo_diseno:'',
    archivo_montaje:[],
    tipo_plancha:'',
    tiempo_exposicion:'',
    maquinas:[],
    tamano_sustrato_imprimir:[],
    area_efectiva:[],
    fuente:[],
    troqueladora:[],
    guillotina:[],
    pegadora:[],
    pegamento:[],
    embalaje:'',
    caja:[],
    unidades_por_caja:0,
    cantidad_por_paquetes:0,
    vista_aerea:'',
    vista_3d:'',
    tipo_paleta:'',
    tamano_paleta:'',
    cantidad_estibas:0,
    peso_cajas:'',
    paletizado:''
    
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
    this.editar = false;
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
    this.editar = false;

  }

  filas(){
    return Math.ceil(this.clientes.clientes.length / 5);
  }

  EditarCliente(cliente){
    this.data = cliente
    this.editar = true;
  }

}
