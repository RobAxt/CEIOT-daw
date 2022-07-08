class Usuario extends Persona implements Acciones{
    private userName: string;

    constructor(nombre:string, edad:number, userName:string) {
        super(nombre, edad);
        this.userName = userName;        
    }

    public mostrar():string {
        return super.mostrar() + ` Usuario: ${this.userName}`; 
    }

    consultar(): string{return "Puede";}
    guardar(): string{return "Puede";}
    modificar(): string{return "No Puede";}
    eliminar():string{return "No Puede";}
}