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