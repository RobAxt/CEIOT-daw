declare const M;

class Main implements EventListenerObject, ResponseListener {
    public queryServer: QueryServer = new QueryServer();
    public devList: Array<Device>;

    constructor() {
        this.queryServer.query("GET", "http://localhost:8000/devices", this);
    }

    public handleEvent(e:Event): void {
        let objetoEvento = <HTMLInputElement>e.target;
     
        // Evento de click en Slider que debe actualizar el state del dispositivo
        if (e.type == "click" && objetoEvento.id.startsWith("slider_")){
            let datos = { "id": objetoEvento.id.substring(7), "state": objetoEvento.value };
            this.queryServer.query("PUT","http://localhost:8000/update", this, datos);
        }

        // Evento de click en botón de listar dispositivos
        if (e.type == "click" && objetoEvento.id == "listDevice") {
            this.queryServer.query("GET", "http://localhost:8000/devices", this);
         }

        // Evento de click en el botón principal para agregar dispositivo
        if (e.type == "click" && objetoEvento.id == "addDevice") {
            let newDev = document.getElementById("dashboard");
            let devFormHTML: string = `<div class="row">
                <a class="btn-floating btn-large waves-effect waves-light red align right"><i class="material-icons" id="addButton">add</i></a>
                <div class="input-field col s12">
                    <i class="material-icons prefix">devices</i>
                    <input type="text" id="addDeviceName" class="autocomplete">
                    <label for="autocomplete-input">Name</label>
                </div>
                <div class="input-field col s12">  
                    <i class="material-icons prefix">perm_device_information</i>
                    <input type="text" id="addDeviceDescription" class="autocomplete">
                    <label for="autocomplete-input">Description</label>
                </div>
                <div class="input-field col s12">
                    <i class="material-icons prefix">menu</i>
                    <select id="addDeviceType">
                        <option value="-1" disabled selected>Choose Device</option>
                        <option value="0">Iluminación</option>
                        <option value="1">Persiana</option>
                        <option value="2">Otro</option>
                    </select>
                    <label>Type</label>
                </div>

              </div>`;
            newDev.innerHTML = devFormHTML;
            
            var elems1 = document.querySelectorAll('autocomplete');
            var instances = M.Autocomplete.init(elems1);

            var elems2 = document.querySelectorAll('select');
            instances = M.FormSelect.init(elems2);

            let addButton = document.getElementById("addButton");
            addButton.addEventListener("click",this);
        }

        // Evento de click en el boton + en el formulario que debe agregar un dispositovo
        if (e.type == "click" && objetoEvento.id == "addButton") {
            let addDevName = document.getElementById("addDeviceName") as HTMLInputElement;
            let addDevDescp = document.getElementById("addDeviceDescription") as HTMLInputElement;
            let addDevType = document.getElementById("addDeviceType") as HTMLInputElement;
            let name:string = addDevName.value;
            let description:string = addDevDescp.value;
            let type:Number = Number(addDevType.value);
            if( name == "" || description == "" || type == -1){
                alert("New Device not configured");
            } else {
                let datos = { "name": name, "description": description, "type": type };
                this.queryServer.query("POST","http://localhost:8000/add", this, datos);
            }
            console.log(name + " " + description + " " + type);
         }

         // Evento de click en el boton principal para borrar dispositvo
        if (e.type == "click" && objetoEvento.id == "deleteDevice") {
            let newDev = document.getElementById("dashboard");
            let devFormHTML: string = `<div class="row">
                <a class="btn-floating btn-large waves-effect waves-light red align right"><i class="material-icons" id="deleteButton">delete_forever</i></a>
                <div class="input-field col s12">
                <div class="input-field col s12">
                <i class="material-icons prefix">menu</i>
                <select id="deleteDeviceId">
                    <option value="0" disabled selected>Choose Device</option>`;
            for(let dev of this.devList) {
                devFormHTML+=`<option value="${dev.id}">${dev.name}</option>`
            }
                    
            devFormHTML+= `</select>
                    <label>Devices</label>
                 </div>
            </div>`;
            newDev.innerHTML = devFormHTML;

            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems);

            let deleteButton = document.getElementById("deleteButton");
            deleteButton.addEventListener("click",this);
        }

        // Evento de click en el boton borrar en el formulario que debe borrar un dispositovo 
        if (e.type == "click" && objetoEvento.id == "deleteButton") { 
            let delDev = document.getElementById("deleteDeviceId") as HTMLInputElement;
            let id:Number = Number(delDev.value); // del select del formulario obtengo que dispositivo se eligio

            if(id > 0) { // ids mayores a cero son ids validos
                let datos = { "id": id };
                this.queryServer.query("DELETE","http://localhost:8000/delete", this, datos);
            } else { // significa que no se selecciono un dispositivo
                alert("Device not selected");
            }
        }
    }

    // Manejador de la respuesta del servidor al método GET
    handlerGET(status:number,response:string):void {
        if (status != 200) 
            return;
        this.devList = JSON.parse(response);
        let devListDiv = document.getElementById("dashboard");
        let devListHTML: string = `<ul class="collection">`;
        for (let dev of this.devList) {
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
        for(let dev of this.devList) {
            let slider = document.getElementById("slider_" + dev.id);
            slider.addEventListener("click",this);
        }
        
    }
    
    handlerPOST(status:number,response:string):void {
        if (status != 200) {
            alert("Something went wrong when trying to add device.")
            return;
        }
        alert("Device Added.");
    }
    
    handlerPUT(status:number,response:string):void {
        if (status != 200) {
            alert("Something went wrong when trying to updte device state.")
            return;
        }
        let resp =  JSON.parse(response);
        alert("Device Updated to " + resp.state*100 + "%");
    };

    handlerDELETE(status:number,response:string):void {
        if (status != 200) {
            alert("Something went wrong when trying to delete device.")
            return;
        }
        let resp = JSON.parse(response);
        alert(`Device deleted (${resp.id})`);
    }
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