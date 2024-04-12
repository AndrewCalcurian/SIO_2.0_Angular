import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormulasService } from 'src/app/services/formulas.service';
import { MaterialesService } from 'src/app/services/materiales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-formula',
  templateUrl: './nueva-formula.component.html',
  styleUrls: ['./nueva-formula.component.scss']
})
export class NuevaFormulaComponent implements OnInit{
  constructor(public tintas:MaterialesService,
              public api:FormulasService
  ){
  }

  public  pantones:any = [];
  ngOnInit(): void {
    this.pantones = this.tintas.PantonesSolo();
  }

  
  formular:any = []
  public material = ''
  public cantidad = ''
  public preparacion = ''
  public cargando = false;

  @Input() nuevo:any;
  @Output() onCloseModal = new EventEmitter();

  agregarMaterial(){

    console.log(this.material)
    let splited = this.material.split('*')
    let data = {
      material:splited[0],
      nombre:splited[1],
      marca:splited[2],
      cantidad:this.cantidad
    }

    this.formular.push(data)
    console.log(this.formular)

    this.material = ''
    this.cantidad = ''
  }

  borrarMaterial(formula_id){
    let index = this.formular.findIndex(x => x.material === formula_id);
    console.log(index);
    
    if (index !== -1) {
        this.formular.splice(index, 1);
        console.log(this.formular);
    } else {
        console.log('Material no encontrado en la lista');
    }
  }

  guardarFormula(){
    this.cargando = true;
    let data = {
      pantone:this.preparacion,
      formula:this.formular
    }
    
    this.api.GuardarFormula(data)
    this.preparacion = ''
    this.formular = ''
    setTimeout(() => {
      Swal.fire({
        text:this.api.mensaje.mensaje,
        icon:this.api.mensaje.icon,
        showConfirmButton:false,
        toast:true,
        timer:5000,
        timerProgressBar:true,
        position:'top-end'
      })
      this.cargando = false;
      this.onCloseModal.emit();
    }, 500);
  }

}
