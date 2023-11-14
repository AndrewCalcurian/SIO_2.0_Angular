import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nueva-especificacion',
  templateUrl: './nueva-especificacion.component.html',
  styleUrls: ['./nueva-especificacion.component.scss']
})
export class NuevaEspecificacionComponent {

  @Input() NUEVA_ESPECIFICACION!:boolean;
  @Output() onCloseModal = new EventEmitter();

  cerrar(){
    this.onCloseModal.emit();
  }
}
