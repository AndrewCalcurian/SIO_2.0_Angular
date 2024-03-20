import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from 'src/app/compras/models/modelos-compra';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ClientesService } from 'src/app/services/clientes.service';
import { MaterialesService } from 'src/app/services/materiales.service';
import { MaquinasService } from 'src/app/services/maquinas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-producto',
  templateUrl: './new-producto.component.html',
  styleUrls: ['./new-producto.component.scss']
})
export class NewProductoComponent {


  constructor(public clientes:ClientesService,
              public materiales:MaterialesService,
              public maquinas:MaquinasService){
                this.crearModelo()
  }

  secuencia = ['Amarillo', 'Azul', 'Rojo', 'Negro'];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.secuencia, event.previousIndex, event.currentIndex);
  }


  @Input() nuevo:any;
  @Input() producto!:Producto
  @Output() onCloseModal = new EventEmitter()

  sustrato_selected = '';
  maquina_selected = '';
  troqueladora_selected = '';
  guillotina_selected = '';
  pegadora_selected = '';
  solucion_selected = '';
  tinta_selected = {
    tinta:'',
    cantidad:0
  }
  barniz_selected = {
    barniz:'',
    cantidad:0
  }

  seleccion_tinta = false;


  style: any = {};
  longitud = 0
  altura = 0
  ejemplares = 0
  margenTop = 0
  margenRight = 0
  margenBottom = 0
  margenLeft = 0

  B_style: any = {};
  B_longitud = 0
  B_altura = 0
  B_ejemplares = 0
  B_margenTop = 0
  B_margenRight = 0
  B_margenBottom = 0
  B_margenLeft = 0

  cards = [
    {title: 'Identificación del producto', content: 'Contenido 1'},
    {title: 'Dimensiones del producto', content: 'Contenido 1'},
    {title: 'Materia prima', content: 'Contenido 1'},
    {title: 'Pre-impresión', content: 'Contenido 1'},
    {title: 'Impresión', content: 'Contenido 1'},
    {title: 'Post-impresión', content: 'Contenido 1'},
    {title: 'Clasificación de defectos', content: 'Contenido 1'},
    // Agrega más tarjetas según sea necesario
  ];
  currentIndex = 0;
  

  cerrar(){
    this.onCloseModal.emit()
  }

  crearModelo(){
    this.style = {
      'width': `200px`,
      'height': `130px`,
      'background': 'rgb(161, 242, 216);',
      'display': 'grid',
      'grid-template-columns': `repeat(${Math.sqrt(this.ejemplares)}, 1fr)`,
      'grid-template-rows': `repeat(${Math.sqrt(this.ejemplares)}, 1fr)`,
      'margin': `${this.margenTop * 2}px ${this.margenRight * 2}px ${this.margenBottom * 2}px ${this.margenLeft * 2}px`,
    }

    this.B_style = {
      'width': `200px`,
      'height': `130px`,
      'background': 'rgb(161, 242, 216);',
      'display': 'grid',
      'grid-template-columns': `repeat(${Math.sqrt(this.B_ejemplares)}, 1fr)`,
      'grid-template-rows': `repeat(${Math.sqrt(this.B_ejemplares)}, 1fr)`,
      'margin': `${this.B_margenTop * 2}px ${this.B_margenRight * 2}px ${this.B_margenBottom * 2}px ${this.B_margenLeft * 2}px`,
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  next() {
    if (this.currentIndex < this.cards.length - 1) {
      this.currentIndex++;
    }
  }

  notificar(){
    if(!this.seleccion_tinta){
      Swal.fire({
        icon:'info',
        title:'Cuidado con el orden',
        text:'Para la creación del producto es necesario señalar las tintas en el orden en el que fueron codificados los colores, la "Cantidad" de tinta necesaria para este producto debe ser indicada por cada 1.000 hojas',
        confirmButtonText:'DE ACUERDO',
        confirmButtonColor:'#48c78e'
      })
      this.seleccion_tinta = true;
    }
  }

  add_sustrato(){
    // Verificar si el sustrato seleccionado no existe en el array antes de agregarlo
    if (!this.producto.sustrato.includes(this.sustrato_selected)) {
        this.producto.sustrato.push(this.sustrato_selected);
    } else {
        // Si el sustrato ya existe, puedes mostrar un mensaje de error o simplemente no hacer nada
        console.log('El sustrato ya está en la lista.');
    }

    // Reiniciar la variable sustrato_selected
    this.sustrato_selected = '';
  }

  maquina_impresora(){
    if (!this.producto.maquinas.includes(this.maquina_selected)) {
      this.producto.maquinas.push(this.maquina_selected);
    }

    this.maquina_selected = ''
  }

  Solucion_fuente(){
    if (!this.producto.fuente.includes(this.solucion_selected)) {
      this.producto.fuente.push(this.solucion_selected);
    }

    this.solucion_selected = ''
  }

  add_tinta(){
    // Verificar si la tinta seleccionada no existe en el array antes de agregarla
    const tintaExistente = this.producto.tintas.find(tinta => tinta.tinta === this.tinta_selected.tinta);

    if (!tintaExistente) {
        this.producto.tintas.push({ tinta: this.tinta_selected.tinta, cantidad: this.tinta_selected.cantidad });
    } else {
        // Si la tinta ya existe, puedes mostrar un mensaje de error o simplemente no hacer nada
        console.log('La tinta ya está en la lista.');
  }

  // Reiniciar las propiedades de la variable tinta_selected
  this.tinta_selected.cantidad = 0;
  this.tinta_selected.tinta = '';
  }

  add_barniz(){
    // Verificar si la tinta seleccionada no existe en el array antes de agregarla
    const barnizExistente = this.producto.barnices.find(barniz => barniz.barniz === this.barniz_selected.barniz);

    if (!barnizExistente) {
        this.producto.barnices.push({ barniz: this.barniz_selected.barniz, cantidad: this.barniz_selected.cantidad });
    } else {
        // Si la tinta ya existe, puedes mostrar un mensaje de error o simplemente no hacer nada
        console.log('El barniz ya está en la lista.');
  }
    // Reiniciar las propiedades de la variable tinta_selected
    this.barniz_selected.cantidad = 0;
    this.barniz_selected.barniz = '';
  }

  Impresion_(maquina, fase_) {
    let incluye = maquina.fases.some(fase => fase.nombre === fase_);
    return incluye;
  }

}
