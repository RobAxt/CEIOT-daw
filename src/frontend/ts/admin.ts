class Administrador extends Persona implements Acciones {
    public tipo:string;

    consultar(): string{return "Puede";}
    guardar(): string{return "Puede";}
    modificar(): string{return "Puede";}
    eliminar():string{return "Puede";}
}