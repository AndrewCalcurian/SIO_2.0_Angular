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
  @Output() onLoading = new EventEmitter();

  nombre = "";
  parcial = "false";
  icono = "";

  ngOnInit(): void {
    var phrases = [
      'Arreglando código de programación',
      'Ajustando colores',
      'Haciendo las conexiones electricas',
      'Descargando la información',
      'Haciendo girar la rueda',
      'Buscando errores',
      'Programando la respuesta que quieres',
      'Ya casi terminamos',
      'Conectando las tuberias'
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
      icono:this.icono
    }
    await this.api.GuardarGrupo(data)

    this.nombre = "";
    this.parcial = 'false';
    this.icono = "";

  }

  cerrar(){
    this.nombre = "";
    this.parcial = 'false';
    this.icono = "";

    this.onCloseModal.emit()

  }

  EditarGrupo(){
    this.api.EditarGrupo(this.data)
    this.onCloseModal.emit()
  }
}
