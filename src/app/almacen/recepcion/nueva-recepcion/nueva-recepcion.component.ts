import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Fabricante } from 'src/app/compras/models/modelos-compra';
import { FabricantesService } from 'src/app/services/fabricantes.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';

@Component({
  selector: 'app-nueva-recepcion',
  templateUrl: './nueva-recepcion.component.html',
  styleUrls: ['./nueva-recepcion.component.scss']
})
export class NuevaRecepcionComponent {

  constructor(public proveedores:ProveedoresService,
              public fabricantes:FabricantesService){}

  @Input() nueva!:boolean;
  @Output() onCloseModal = new EventEmitter();

  public documento!:string;
  public OC!:string;
  public recepcion!:string;
  public transportista!:string
  public proveedor!:string
  public fabricante:any

  public documentoLleno:boolean = false;
  public OCLLeno:boolean = false;
  public recepcionLleno:boolean = false;
  public transportistaLleno:boolean = false;

  cerrar(){
    this.onCloseModal.emit();
  }

  buscarFabricantes = async(e:any)=>{
    let fabricantes = this.proveedores.proveedores[e.value].fabricantes;
    this.fabricante = this.fabricantes.buscarFabricantesPorId(fabricantes._id)
  }

}
