
function SayHello(){
    let current_value = document.getElementById("textarea_1") as HTMLInputElement;
    let new_value = "Hello world!!!" + "\n" + current_value.value;
    document.getElementById("textarea_1").innerHTML = new_value ;
}

class Main {
    public usr: Usuario;
    constructor() {
        this.usr =  new Usuario("Roberto",42);
        //console.log(this.usr.mostrar());
    }
}
function inicio() {    
    let main:Main = new Main();
    let texto = document.getElementById("textarea_1");
    texto.innerHTML = main.usr.mostrar();
}

window.onload = inicio;