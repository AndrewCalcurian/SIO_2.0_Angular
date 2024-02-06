import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent {


  @Input() data:any;
  @Input() info:any;
  @Input() informacion:any;
  @Output() onCloseModal = new EventEmitter();


  cerrar(){
    this.onCloseModal.emit();
  }
}
