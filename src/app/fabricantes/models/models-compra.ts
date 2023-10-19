export class Origenes {
    constructor(
        public pais: string,
        public estado: string
    ){}
}

export class Grupos {
    constructor(
        public _id:string,
        public nombre:string
    ) {}
}

export class Fabricante {
    constructor(
        public nombre:string,
        public alias:string,
        public origenes:Array<Origenes>,
        public grupo:Array<Grupos["_id"]>
    ){}
}