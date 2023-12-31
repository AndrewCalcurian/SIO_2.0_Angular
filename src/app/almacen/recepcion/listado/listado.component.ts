import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent {
  @Input() listado!:boolean;
  @Input() lista:any;
  @Input() fabricacion!:string[];
  @Input() n!:number;
  @Output() onCerrarModal = new EventEmitter();

  currentDate = new Date();
  year = this.currentDate.getFullYear();
  month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
  day = String(this.currentDate.getDate()).padStart(2, '0');
  Hoy = `${this.year}-${this.month}-${this.day}`;

  cerrar(){
    this.onCerrarModal.emit();
  }

}
