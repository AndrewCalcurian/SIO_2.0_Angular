import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { Fabricante, Fabricante_populated, Grupo, Origenes } from '../../models/modelos-compra';
import { FabricantesService } from 'src/app/services/fabricantes.service';

@Component({
  selector: 'app-nuevo-fabricante',
  templateUrl: './nuevo-fabricante.component.html',
  styleUrls: ['./nuevo-fabricante.component.scss']
})
export class NuevoFabricanteComponent implements OnInit{
  @Input() nuevo :any;
  @Input() data!  :Fabricante_populated;
  @Input() editar:any;
  @Input() cargando!:boolean;
  @Output() onCloseModal = new EventEmitter();

  nombre :string = '';
  alias  :string = '';
  pais   :string = 'Venezuela';
  estado :string = '';
  grupo  :string = ''

  public origenes:Array<Origenes> = [];
  public grupos:Array<Grupo> = []

  constructor(public api:FabricantesService){
    
  }

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

  cerrar(){
    this.onCloseModal.emit()
  }

  addOrigen(){
    let busqueda = this.origenes.find( x => x.pais === this.pais && x.estado === this.estado)

    if(!busqueda){
      this.origenes.push({pais:this.pais, estado:this.estado})
      this.estado = ''
    }
  }

  deleteOrigen(i:number){
    this.origenes.splice(i, 1)
  }

  deleteGrupo(i:number){
    this.grupos.splice(i, 1)
  }

  deleteOrigen_(i:number){
    this.data.origenes.splice(i, 1)
  }

  deleteGrupo_(i:number){
    this.data.grupo.splice(i, 1)
  }

  addOrigen_(){
    let busqueda = this.data.origenes.find( x => x.pais === this.pais && x.estado === this.estado)

    if(!busqueda){
      this.data.origenes.push({pais:this.pais, estado:this.estado})
      this.estado = ''
    }
  }

  addGrupo_(){
    let s_ = this.grupo.split('*')
    let nombre = s_[0]
    let id = s_[1]
    let busqueda = this.data.grupo.find(x=> x._id === id && x.nombre === nombre)
    if(!busqueda){
      this.data.grupo.push({_id:id, nombre})
      this.grupo = ''
    }
  }

  addGrupo(){
    console.log('aja')
    let s_ = this.grupo.split('*')
    let nombre = s_[0]
    let id = s_[1]
    let busqueda = this.grupos.find(x=> x._id === id && x.nombre === nombre)
    if(!busqueda){
      this.grupos.push({_id:id, nombre})
      this.grupo = ''
    }
  }

  guardarFabricante(): void {
    const { nombre, alias, origenes, grupos } = this;
    const nuevoFabricante: Fabricante = {
      nombre,
      alias,
      origenes,
      grupo: grupos.map(grupo => grupo._id),
      _id: ''
    };
    this.api.agregarFabricante(nuevoFabricante);
    this.onCloseModal.emit();
  }

  editarFabricante(){
    this.api.editarFabricante(this.data)

    this.onCloseModal.emit()
  }


}
