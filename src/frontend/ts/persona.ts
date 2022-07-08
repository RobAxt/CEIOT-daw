class Persona {
    public nombre: string;
    public edad: number;

    constructor(nombre:string, edad:number) {
        this.nombre = nombre;
        this.edad = edad;
    }
    public setEdad(edad:number):void {
        this.edad = edad;
    }

    public getEdad():number {
        return this.edad;
    }

    public getNombre():string {
        return this.nombre;
    }
    
    public mostrar():string {
        return "Nombre: " +this.nombre+" Edad: " + this.edad ;
    }
}