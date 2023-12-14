import { SweetAlertIcon } from "sweetalert2";

export class Origenes {
    constructor(
        public pais: string,
        public estado: string
    ){}
}

export class Grupo {
    constructor(
        public nombre:string,
        public trato?:boolean,
        public icono?:string,
        public parcial?:boolean,
        public _id?:string
    ){}
}

export class Fabricante {
    constructor(
        public nombre:string,
        public alias:string,
        public origenes:Array<Origenes>,
        public grupo:any,
        public _id:string,
        public proveedor:boolean
    ){}
}

export class Fabricante_populated {
    constructor(
        public nombre:string,
        public alias:string,
        public origenes:Array<Origenes>,
        public grupo:Array<Grupo>,
        public _id?:string
    ){}
}

export class Materiales {
    constructor(
        public nombre:string,
        public calibre:string,
        public codigo:string,
        public color:string,
        public fabricante:string,
        public gramaje:string,
        public grupo:string,
        public origen:string,
        public serie:string
    ){}
}

export class Proveedores {
    constructor(
        public nombre:string,
        public direccion:string,
        public rif:string,
        public fabricantes:any,
        public contactos:[{
            nombre   :string,
            email    :string,
            numero   :string
        }]
    ){

    }
}

export class Mensaje {
    constructor(
        public mensaje:string,
        public icon:SweetAlertIcon
    ){}
}

  export class Gramaje {
    constructor(
        public min: number,
        public nom: number,
        public max: number,
    ){}
  }
  
  export class Calibre {
    constructor(
        public pt: Gramaje,
        public um: Gramaje,
        public mm: Gramaje,
    ){}
  }
  
  export class Cobb {
    constructor(
        public top: Gramaje,
        public back: Gramaje,
    ){}
  }
  
  export class EspecificacionSustrato {
    constructor(
        public gramaje: Gramaje,
        public calibre: Calibre,
        public cobb: Cobb,
        public curling: Gramaje,
        public blancura: Gramaje,
    ){}
  }

  export class AnalisisSustrato {
    constructor(
        public numero_muestras: number,
        public masa_inicial:number[],
        public masa_final:number[],
        public gramaje:any,
        public cobb_top:number[],
        public cobb_back:number[],
        public ancho:number,
        public largo:number,
        public gramaje_cobb:{
            promedio:number,
            desviacion:number,
            max:number,
            min:number,
            cobb_top_max:number,
            cobb_top_min:number,
            cobb_back_max:number,
            cobb_back_min:number,
            decimales:number  
        },

    ){}
  }

  export class AnalisisSustrato2 {
    constructor(
        public numero_muestras:number,
        public ancho:number,
        public largo:number,
        public gramaje:{
            masa_inicial:number[],
            masa_final:number[],
            gramaje:any,
            promedio:number,
            desviacion:number,
            max:number,
            min:number,
            decimales:number
        },
        public cobb:{
            top:{
                cobb:number[],
                max:number,
                min:number
                promedio:number,
                desviacion:number,
                decimales:number
            },
            back:{
                cobb:number[],
                max:number,
                min:number
                promedio:number,
                desviacion:number,
                decimales:number
            }
        },
        public calibre:{
            mm:{
                mm:number[],
                max:number,
                min:number,
                promedio:number,
                desviacion:number,
                decimales:number
            },
            um:{
                um:number[],
                max:number,
                min:number,
                promedio:number,
                desviacion:number,
                decimales:number
            },
            pt:{
                pt:number[],
                max:number,
                min:number,
                promedio:number,
                desviacion:number,
                decimales:number
            },
        }
    ){}
  }