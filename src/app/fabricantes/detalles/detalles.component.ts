import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FabricantesService } from 'src/app/services/fabricantes.service';
import { Fabricante } from '../models/models-compra';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent {

  @Input() detalle!:boolean;
  @Input() fabricante!:Fabricante;
  @Output() onClickClose = new EventEmitter();


  cerrar(){
    this.onClickClose.emit()
  }

}
