
function SayHello(){
    let current_value = document.getElementById("textarea_1") as HTMLInputElement;
    let new_value = "Hello world!!!" + "\n" + current_value.value;
    document.getElementById("textarea_1").innerHTML = new_value ;
}

class Main implements EventListenerObject{
    public listaPersonas: Array<Persona> = new Array();
    public usr: Persona;
    public adm: Persona;
    constructor() {
        this.listaPersonas.push(new Usuario("Roberto",42,"rob"));
        this.listaPersonas.push(new Administrador("Javier", 45));
        this.usr = new Usuario("Roberto",42,"rob");
        this.adm = new Administrador("Javier", 45);
        //console.log(this.usr.mostrar());
    }
    public handleEvent(object: Event): void {      
        if(object.type == "click")
            alert("From "+object.target.id +" Hola Mundo!!!! " + this.listaPersonas[0].getNombre());
    };
}
function inicio() { 
    
    let btnSaludar = document.getElementById("btnSaludar");

    btnSaludar.addEventListener("click",btnSaludarClick);
    btnSaludar.addEventListener("click",function(){alert("Hola Mundo!!");}); //funcion anonima
    btnSaludar.addEventListener("click",()=>{alert("Hola Mundo!!!");}); //arrow funcion
    
    let main:Main = new Main();
    
    //let click:EventListenerObject  = main;
    btnSaludar.addEventListener("click",main);
    let texto = document.getElementById("textarea_1");
    texto.innerHTML = main.usr.mostrar() + "\r\n" 
    texto.innerHTML += main.adm.mostrar() + "\r\n";
    for(let i in main.listaPersonas)
        texto.innerHTML += main.listaPersonas[i].mostrar();
    /*console.log("usuario", main.usr.eliminar());
    console.log("administrador", main.adm.eliminar());*/
}

function btnSaludarClick():void {
    alert("Hola Mundo!");
}

window.addEventListener("load",inicio);
//window.onload = inicio;