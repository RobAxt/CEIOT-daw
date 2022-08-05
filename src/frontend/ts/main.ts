class Main implements EventListenerObject, ResponseListener {
    public queryServer: QueryServer = new QueryServer();

    constructor() {
        this.queryServer.query("GET", "http://localhost:8000/devices", this);
    }

    public handleEvent(e:Event): void {
        let objetoEvento = <HTMLInputElement>e.target;
     
        // Evento de actualizacion de State del Dispositivo
        if (e.type == "click" && objetoEvento.id.startsWith("slider_")){
            console.log("se hizo click para prender o apagar "+ objetoEvento.id.substring(7) +"-->"+objetoEvento.value);
            let datos = { "id": objetoEvento.id.substring(7), "state": objetoEvento.value };
            this.queryServer.query("PUT","http://localhost:8000/update", this, datos);
        }

        if (e.type == "click" && objetoEvento.id == "listDevice") {
            this.queryServer.query("GET", "http://localhost:8000/devices", this);
         }

        //
        if (e.type == "click" && objetoEvento.id == "addDevice") {
            //alert("TODO: " + objetoEvento.id);    
            let newDev = document.getElementById("dashboard");
            let devFormHTML: string = ``;
            newDev.innerHTML = devFormHTML;
        }

        if (e.type == "click" && objetoEvento.id == "deleteDevice") { }
    }

    handlerGET(status:number,response:string):void {
        if (status != 200) 
            return;
        let devList: Array<Device> = JSON.parse(response);
        let devListDiv = document.getElementById("dashboard");
        let devListHTML: string = `<ul class="collection">`;
        for (let dev of devList) {
            devListHTML += `<li class="collection-item avatar">`
            if(dev.type == 0)
                devListHTML += `<img src="../static/images/lightbulb.png" alt="" class="circle">`
            else
                devListHTML += `<img src="../static/images/window.png" alt="" class="circle">`
            devListHTML +=  `<span class="title nombreDisp">${dev.name}</span>
                             <p>${dev.description}</p>
                             <a href="#!" class="secondary-content"> <div class="switch">
                                <form action="#">
                                    <p class="range-field">
                                        <input type="range" id="slider_${dev.id}" min="0" max="1" step="0.01" value="${dev.state}"/>
                                    </p>
                                </form>
                             </a>
                            </li>`;
        }
        devListHTML += `</ul>`
        devListDiv.innerHTML = devListHTML;
        for(let disp of devList) {
            let slider = document.getElementById("slider_" + disp.id);
            slider.addEventListener("click",this);
        }
        
    }
    handlerPOST(status:number,response:string):void {}
    handlerPUT(status:number,response:string):void {};
    handlerDELETE(status:number,response:string):void {}
}



//========================== On Load Event ==========================

window.addEventListener("load", ()=> {
    let btnListDevice = document.getElementById("listDevice");
    let btnAddDevice = document.getElementById("addDevice");
    let btnDeleteDevice = document.getElementById("deleteDevice");
    let main: Main = new Main();
 
    btnListDevice.addEventListener("click", main);
    btnAddDevice.addEventListener("click", main);
    btnDeleteDevice.addEventListener("click", main);

});