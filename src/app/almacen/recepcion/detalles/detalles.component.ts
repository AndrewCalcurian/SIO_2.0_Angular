import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent {

  @Input() detalle!:boolean;
  @Output() onCloseModal = new EventEmitter();

  cerrar(){
    this.onCloseModal.emit()
  }
}
