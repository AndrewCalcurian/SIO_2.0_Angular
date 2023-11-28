import { Component, Input, OnInit } from '@angular/core';
import { rgb2lab, lab2rgb, deltaE } from 'rgb-lab';
import {Draggable} from 'Draggable'

@Component({
  selector: 'app-analisis-tinta',
  templateUrl: './analisis-tinta.component.html',
  styleUrls: ['./analisis-tinta.component.scss']
})
export class AnalisisTintaComponent implements OnInit{

  ngOnInit(): void {
  }


  @Input() Tinta:any;
  @Input() Recepcion:any;
  @Input() Materiales:any;


// DRAG
private isDragging: boolean = false;
  private initialX: number = 0;
  private initialY: number = 0;
  private offsetX: number = 0;
  private offsetY: number = 0;

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.initialX = event.clientX;
    this.initialY = event.clientY;
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.offsetX = event.clientX - this.initialX;
      this.offsetY = event.clientY - this.initialY;
      // Aplica la transformación de translación al div draggable
      const draggableDiv = document.getElementsByClassName('draggable')[0] as HTMLElement;
      draggableDiv.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px)`;
    }
  }

  onMouseUp(event: MouseEvent) {
    this.isDragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
  }
// DRAG


  public Analisis:any = {
    cualitativo:{
      tono:false,
      opacidad:false,
      viscosidad:false,
      secadoCapaFina:false,
      secadoCapaGruesa:false,
      brillo:false
    },
    cuantitativo:{
      papel:false,
      carton:false,
      gramaje:'',
      calibre:'',
      muestra:''
    },
    sustrato_muestra:'',
    carton:{
      estandar_1:{
        l:'',
        a:'',
        b:''
      },
      estandar_2:{
        l:'',
        a:'',
        b:''
      },
      estandar_3:{
        l:'',
        a:'',
        b:''
      },
     muestra_1:{
        l:'',
        a:'',
        b:'',
        ll:'',
        aa:'',
        bb:'',
        e:''
      },
     muestra_2:{
        l:'',
        a:'',
        b:'',
        ll:'',
        aa:'',
        bb:'',
        e:''
      },
     muestra_3:{
        l:'',
        a:'',
        b:'',
        ll:'',
        aa:'',
        bb:'',
        e:''
      }
    },
    papel:{
      estandar_1:{
        l:'',
        a:'',
        b:''
      },
      estandar_2:{
        l:'',
        a:'',
        b:''
      },
      estandar_3:{
        l:'',
        a:'',
        b:''
      },
     muestra_1:{
        l:'',
        a:'',
        b:'',
        ll:'',
        aa:'',
        bb:'',
        e:''
      },
     muestra_2:{
        l:'',
        a:'',
        b:'',
        ll:'',
        aa:'',
        bb:'',
        e:''
      },
     muestra_3:{
        l:'',
        a:'',
        b:'',
        ll:'',
        aa:'',
        bb:'',
        e:''
      }
    },
    muestra:{
      estandar_1:{
        l:'',
        a:'',
        b:''
      },
      estandar_2:{
        l:'',
        a:'',
        b:''
      },
      estandar_3:{
        l:'',
        a:'',
        b:''
      },
    }
  }

  public estandar = 'background-color: rgb(255,255,255)'
  public muestra = 'background-color: rgb(255,255,255)'
  public compare = false;
  public selecccion = 0;

  public RollDown = {
    descarga_1:{
      muestra:'',
      estandar:''
    },
    descarga_2:{
      muestra:'',
      estandar:''
    },
    descarga_3:{
      muestra:'',
      estandar:''
    },
  }

  public RollDownModal = false;

  isAnalisisCartonFilled(): boolean {
    const carton = this.Analisis.carton;
    return (
      carton.estandar_1.l && carton.estandar_1.a && carton.estandar_1.b &&
      carton.estandar_2.l && carton.estandar_2.a && carton.estandar_2.b &&
      carton.estandar_3.l && carton.estandar_3.a && carton.estandar_3.b &&
      carton.muestra_1.l && carton.muestra_1.a && carton.muestra_1.b &&
      carton.muestra_1.ll && carton.muestra_1.aa && carton.muestra_1.bb && carton.muestra_1.e &&
      carton.muestra_2.l && carton.muestra_2.a && carton.muestra_2.b &&
      carton.muestra_2.ll && carton.muestra_2.aa && carton.muestra_2.bb && carton.muestra_2.e &&
      carton.muestra_3.l && carton.muestra_3.a && carton.muestra_3.b &&
      carton.muestra_3.ll && carton.muestra_3.aa && carton.muestra_3.bb && carton.muestra_3.e
    );
  }

  selaccionar(n:number){
    this.selecccion = n;
  }

  muestreo(e){
    this.Analisis.cuantitativo.muestra = e.value;
  }

  Carton(event:any){
    if(event.target.checked){
      this.Analisis.cuantitativo.carton = true;
    }else{
      this.Analisis.cuantitativo.carton = false;
    }
  }

  Papel(event:any){
    if(event.target.checked){
      this.Analisis.cuantitativo.papel = true;
    }else{
      this.Analisis.cuantitativo.papel = false;
    }
  }

  comparar(dato){
    switch(dato){
      case 'C1':
        let estandar = lab2rgb([this.Analisis.carton.estandar_1.l,this.Analisis.carton.estandar_1.a,this.Analisis.carton.estandar_1.b])
        this.estandar = 'background-color: rgb('+estandar[0]+','+estandar[1]+','+estandar[2]+')'
        let muestra = lab2rgb([this.Analisis.carton.muestra_1.l,this.Analisis.carton.muestra_1.a,this.Analisis.carton.muestra_1.b])
        this.muestra = 'background-color: rgb('+muestra[0]+','+muestra[1]+','+muestra[2]+')'
      break;
      case 'C2':
        let estandar2 = lab2rgb([this.Analisis.carton.estandar_2.l,this.Analisis.carton.estandar_2.a,this.Analisis.carton.estandar_2.b])
        this.estandar = 'background-color: rgb('+estandar2[0]+','+estandar2[1]+','+estandar2[2]+')'
        let muestra2 = lab2rgb([this.Analisis.carton.muestra_2.l,this.Analisis.carton.muestra_2.a,this.Analisis.carton.muestra_2.b])
        this.muestra = 'background-color: rgb('+muestra2[0]+','+muestra2[1]+','+muestra2[2]+')'
      break;
      case 'C3':
        let estandar3 = lab2rgb([this.Analisis.carton.estandar_3.l,this.Analisis.carton.estandar_3.a,this.Analisis.carton.estandar_3.b])
        this.estandar = 'background-color: rgb('+estandar3[0]+','+estandar3[1]+','+estandar3[2]+')'
        let muestra3 = lab2rgb([this.Analisis.carton.muestra_3.l,this.Analisis.carton.muestra_3.a,this.Analisis.carton.muestra_3.b])
        this.muestra = 'background-color: rgb('+muestra3[0]+','+muestra3[1]+','+muestra3[2]+')'
      break;
      }
    this.compare = true
  }

  move(){
    let rgb_converted = lab2rgb([this.Analisis.carton.estandar_1.l,this.Analisis.carton.estandar_1.a,this.Analisis.carton.estandar_1.b])
    
  }

  move2(){
    let rgb_converted = lab2rgb([this.Analisis.carton.muestra_1.l,this.Analisis.carton.muestra_1.a,this.Analisis.carton.muestra_1.b])
  }

  ShowRollDown(n){
    // 0 = carton
    // 1 = papel

    switch(n){
      case 0:
        let estandar = lab2rgb([this.Analisis.carton.estandar_1.l,this.Analisis.carton.estandar_1.a,this.Analisis.carton.estandar_1.b])
        let muestra = lab2rgb([this.Analisis.carton.muestra_1.l,this.Analisis.carton.muestra_1.a,this.Analisis.carton.muestra_1.b])
        let estandar2 = lab2rgb([this.Analisis.carton.estandar_2.l,this.Analisis.carton.estandar_2.a,this.Analisis.carton.estandar_2.b])
        let muestra2 = lab2rgb([this.Analisis.carton.muestra_2.l,this.Analisis.carton.muestra_2.a,this.Analisis.carton.muestra_2.b])
        let estandar3 = lab2rgb([this.Analisis.carton.estandar_3.l,this.Analisis.carton.estandar_3.a,this.Analisis.carton.estandar_3.b])
        let muestra3 = lab2rgb([this.Analisis.carton.muestra_3.l,this.Analisis.carton.muestra_3.a,this.Analisis.carton.muestra_3.b])

        this.RollDown.descarga_1.estandar = 'background-color: rgb('+estandar[0]+','+estandar[1]+','+estandar[2]+')'
        this.RollDown.descarga_1.muestra = 'background-color: rgb('+muestra[0]+','+muestra[1]+','+muestra[2]+')'
        this.RollDown.descarga_2.estandar = 'background-color: rgb('+estandar2[0]+','+estandar2[1]+','+estandar2[2]+')'
        this.RollDown.descarga_2.muestra = 'background-color: rgb('+muestra2[0]+','+muestra2[1]+','+muestra2[2]+')'
        this.RollDown.descarga_3.estandar = 'background-color: rgb('+estandar3[0]+','+estandar3[1]+','+estandar3[2]+')'
        this.RollDown.descarga_3.muestra = 'background-color: rgb('+muestra3[0]+','+muestra3[1]+','+muestra3[2]+')'      
      break;
    }

    this.RollDownModal = true;
  }

}
