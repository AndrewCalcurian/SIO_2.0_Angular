import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialesService } from 'src/app/services/materiales.service';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.scss']
})
export class MaterialesComponent {
  @Input() material:any;
  @Input() material_selected:any
  @Output() onCloseModal = new EventEmitter();


  constructor(public api:MaterialesService){}

  cerrar(){
    this.onCloseModal.emit()
  }

  colores(color:string){

    switch(color){
      case "A":
        return 'Amarillo'
      break;
      case "C":
        return 'Cyan'
      break;
      case "M":
        return 'Magenta'
      break;
      case "K":
        return 'Negro'
      break;
      default:
        return null
      break;
  }

}

editar(i:number){
  document.getElementById(`nombre_${i}`)!.style.display = 'block';
  document.getElementById(`serie_${i}`)!.style.display = 'block';
  if(document.getElementById(`gramaje_${i}`)){
    document.getElementById(`gramaje_${i}`)!.style.display = 'block';
    document.getElementById(`calibre_${i}`)!.style.display = 'block';
  }
  document.getElementById(`editar_${i}`)!.style.display = 'none';
  document.getElementById(`confirmar_${i}`)!.style.display = 'block';
}

confirmar(i:number){
  document.getElementById(`nombre_${i}`)!.style.display = 'none';
  document.getElementById(`serie_${i}`)!.style.display = 'none';
  if(document.getElementById(`gramaje_${i}`)){
    document.getElementById(`gramaje_${i}`)!.style.display = 'none';
    document.getElementById(`calibre_${i}`)!.style.display = 'none';
  }
  document.getElementById(`editar_${i}`)!.style.display = 'block';
  document.getElementById(`confirmar_${i}`)!.style.display = 'none';



    console.log(this.material_selected[i])

}

}
