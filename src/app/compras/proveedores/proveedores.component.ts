import { Component } from '@angular/core';
import { ProveedoresService } from 'src/app/services/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent {

  public nuevo:boolean = false;

  constructor(public api:ProveedoresService){

  }

  addnuevo(){
    this.nuevo = true;
  }


  cerrar(){
    this.nuevo = false;
  }
}
