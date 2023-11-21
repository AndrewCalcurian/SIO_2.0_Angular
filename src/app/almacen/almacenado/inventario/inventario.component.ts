import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent {
  @Input() Inventario!:boolean;
  @Input() listado!:boolean;
  @Output() onCloseModal = new EventEmitter()



  cerrar(){
    this.onCloseModal.emit()
  }
}
