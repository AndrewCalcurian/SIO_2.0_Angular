import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.scss']
})
export class MaterialesComponent {

  @Input() material:any;
  @Output() onCloseModal = new EventEmitter();

  cerrar(){
    this.onCloseModal.emit()
  }

}
