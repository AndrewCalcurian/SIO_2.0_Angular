import { Component } from '@angular/core';
import { FormulasService } from 'src/app/services/formulas.service';
import { MaterialesService } from 'src/app/services/materiales.service';

@Component({
  selector: 'app-preparacion-tintas',
  templateUrl: './preparacion-tintas.component.html',
  styleUrls: ['./preparacion-tintas.component.scss']
})
export class PreparacionTintasComponent {

  constructor(public materiales:MaterialesService,
              public formulas:FormulasService
  ){}

  public nuevo = false;
  public formulas_:any = []
  public _seBusco = false;
  public name = ''

  MostrarInfo(pantone, name ){
    this.name = name
    this.formulas_ = pantone
    this.formulas_ = this.formulas.BuscarFormulas(pantone)
    console.log(this.formulas_)
    setTimeout(() => {
      this._seBusco = true
    }, 1000);
  }

  cerrar(){
    this.nuevo = false;
  }
  




}
