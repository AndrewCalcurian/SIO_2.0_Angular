import { Component } from '@angular/core';
import { RecepcionService } from 'src/app/services/recepcion.service';
import Swall from 'sweetalert2'
@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.scss']
})
export class RecepcionComponent {
  public clicked: any;
  public detalle: boolean = false;
  public edicion: boolean = false;
  public nueva: boolean = false;
  public Material_selected!: any;
  public n_word!: any

  constructor(public api: RecepcionService) {

  }

  showInfo() {
    if (!this.clicked) {
      this.clicked = true;
    } else {
      this.clicked = false;
    }
  }

  mostrarDetalle() {
    this.detalle = true;
  }

  NuevaRecepcion() {
    this.nueva = true;
  }

  publicMaterial(x: number, y: number) {
    this.detalle = true;
    this.Material_selected = this.api.recepciones[x]
    this.n_word = y

    console.log(this.Material_selected)
  }

  EdicionDeMaterial(x: number, y: number) {
    this.edicion = true;
    this.Material_selected = this.api.recepciones[x]
    this.n_word = y

    console.log(this.Material_selected)
  }

  notificar(id: string) {
    this.api.NoticarRecepcion(id);
    setTimeout(() => {
      Swall.fire({
        text: this.api.mensaje.mensaje,
        icon: this.api.mensaje.icon,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 5000
      })
    }, 1000)
    console.log(id);
  }

  checkar(id: string) {
    console.log(id)
    this.api.checkearRecepcion(id);
  }

}
