import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrabajadoresService } from 'src/app/services/trabajadores.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.scss']
})
export class TrabajadoresComponent implements OnInit{
  public randomUsers;
  constructor(private http: HttpClient,
              public trabajadores:TrabajadoresService
  ){}
  
  
  ngOnInit(): void {
    }
      
  public nuevo_trabajador = false;

  public colores = [
    '#30cf60',
    '#375bea',
    '#ac2abe'
  ]

  public color_generos = [
    '#ff78b5',
    '#78a1ff'
  ]

  public trabajador = {
    datos_personales:{
      apellidos:'',
      nombres:'',
      cedula:'',
      fecha_nac:'',
      altura:'',
      peso:'',
      sexo:'',
      nacimiento:'',
      nacionalidad:'',
      estado_civil:'',
      licencia:'',
      grado:'',
      rif:'',
      email:'',
      estado:'',
      municipio:'',
      parroquia:'',
      sector:'',
      domicilio:'',
      telefono:'',
      celular:''
    },
    informacion_adicional:{
      referencias:[],
      carga_familiar:[],
      emergencia:[],
    },
    instruccion_academica:{
      grado:{
        instruccion:'',
        ano:'',
        titulo:''
      },
      cursos:[],
      idiomas:{
        idiomas:[]
      }
    },
      manejo_herramientas:{
        computadora:false,
        softwares:{
          word:false,
          excel:false,
          power_point:false,
          acrobat:false
        },
        otros:[],
        referencias:[]
      },
      contratacion:{
        fecha:'',
        departamento:'',
        cargo:'',
        de:'',
        sueldo:''
      }
  }

  getRandomLetter(): string {
    const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
  }

  getRandomColor(): string {
    return this.colores[Math.floor(Math.random() * 3)];
  }

  getGender(): string {
    return this.color_generos[Math.floor(Math.random()* 2)];
  }

  eliminarTrabajador(trabajador:any){
    this.trabajadores.eliminarTrabajador(trabajador)
    setTimeout(() => {
      Swal.fire({
        text:this.trabajadores.mensaje.mensaje,
        icon:this.trabajadores.mensaje.icon,
        position:'top-end',
        timerProgressBar:true,
        showConfirmButton:false,
        toast:true,
        timer:5000
      })
    }, 500);
  }

}
