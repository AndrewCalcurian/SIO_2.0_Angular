import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-condicion',
  templateUrl: './condicion.component.html',
  styleUrls: ['./condicion.component.scss']
})
export class CondicionComponent {

  @Input() condicion!:boolean;
  @Input() recepcion!:any;
  @Input() n!:number;
  @Output() onCloseModal = new EventEmitter();

  cerrar(){
   this.recepcion[this.n].check = true;
   this.onCloseModal.emit();
  }
}
