export class Origenes {
    constructor(
        public pais: string,
        public estado: string
    ){}
}

export class Grupo {
    constructor(
        public nombre:string,
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
        public grupo:Array<Grupo["_id"]>,
        public _id:string
    ){}
}

export class Fabricante_populated {
    constructor(
        public nombre:string,
        public alias:string,
        public origenes:Array<Origenes>,
        public grupo:Array<Grupo>
    ){}
}

export class Proveedores {
    constructor(
        public nombre:string,
        public direccion:string,
        public rif:string,
        public fabricante:string,
        public contactos:{
            nombre   :string,
            email    :string,
            numero   :string
        }
    ){

    }
}