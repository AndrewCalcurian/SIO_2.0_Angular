import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-grupo',
  templateUrl: './nuevo-grupo.component.html',
  styleUrls: ['./nuevo-grupo.component.scss']
})
export class NuevoGrupoComponent implements OnInit{
  @Input() api:any;
  @Input() nuevo:any;
  @Input() editar:any;
  @Input() data:any;
  @Input() cargando!:boolean;
  @Output() onCloseModal = new EventEmitter();
  @Output() onCloseModal_ = new EventEmitter();
  @Output() onLoading = new EventEmitter();

  nombre = "";
  parcial = "false";
  icono = "";
  trato = false;

  ngOnInit(): void {
    var phrases = [
      'Arreglando código de programación',
      'Ajustando colores',
      'Descargando la información',
      'Buscando errores',
      'Programando la respuesta que quieres',
      'Ya casi terminamos',
    ];
  
    // Function to change the random phrase
    function changeRandomPhrase() {
      var randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      document.getElementById('random-phrases')!.textContent = randomPhrase;
    }
  
    // Call the function every 1 second
    setInterval(changeRandomPhrase, 2000);
  }

  public nuevoGrupo = async()=>{
    this.onCloseModal.emit()
    let data = {
      nombre:this.nombre,
      parcial:this.parcial,
      icono:this.icono,
      trato:this.trato
    }
    await this.api.GuardarGrupo(data)

    this.nombre = "";
    this.parcial = 'false';
    this.icono = "";
    this.trato = false;

  }

  verTrato(e:any){
    this.trato = e.checked
  }

  cerrar(){
    this.nombre = "";
    this.parcial = 'false';
    this.icono = "";

    this.onCloseModal.emit()

  }

  cerrar_(){
    this.nombre = "";
    this.parcial = 'false';
    this.icono = "";

    this.onCloseModal_.emit()

  }

  EditarGrupo(){
    this.api.EditarGrupo(this.data)
    this.onCloseModal.emit()
  }
}
