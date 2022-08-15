declare const M;

class Main implements EventListenerObject, ResponseListener {
    public queryServer: QueryServer = new QueryServer();
    public devList: Array<Device>;

    constructor() {
        this.queryServer.query("GET", "http://localhost:8000/devices", this);
    }

    public handleEvent(e:Event): void {
        let objetoEvento = <HTMLInputElement>e.target;

//========================= Update Event  =========================     

        // Evento de click en Slider que debe actualizar el state del dispositivo
        if (e.type == "click" && objetoEvento.id.startsWith("slider_")){
            let datos = { "id": objetoEvento.id.substring(7),"key": "state", "value": objetoEvento.value };
            this.queryServer.query("PUT","http://localhost:8000/update", this, datos);
        }

//=================================================================

//========================== Edit Event  ==========================

        // Evento de click en lapiz que debe cargar el dashboard de edicion
        if (e.type == "click" && objetoEvento.id.startsWith("edit_")){
            let i: number;
            for(i=0; i < this.devList.length; i++) {
                if(objetoEvento.id.substring(5) == this.devList[i].id.toString())
                    break;
            }
            let editDev = document.getElementById("dashboard");
            let editDevFormHTML: string = `<div class="row">
                <div class="input-field col s12 m12 l12 xl12">
                    <a class="btn-floating btn-large waves-effect waves-light red align right"><i class="material-icons" id="editButton_${i}">edit</i></a>
                </div>
                <div class="input-field col s12 m12 l12 xl12">
                    <i class="material-icons prefix">stay_current_portrait</i>
                    <input placeholder="${this.devList[i].name}" type="text" id="editDeviceName">
                    <label for="editDeviceName">Name</label>
                </div>
                <div class="input-field col s12 m12 l12 xl12">  
                    <i class="material-icons prefix">perm_device_information</i>
                    <input placeholder="${this.devList[i].description}" type="text" id="editDeviceDescription" class="autocomplete">
                    <label for="editDeviceDescription">Description</label>
                </div>
                <div class="input-field col s12 m12 l12 xl12">
                    <i class="material-icons prefix">menu</i>
                    <select id="editDeviceType">`
            editDevFormHTML += this.devList[i].type == 0 ?`<option value="0" selected>Iluminación</option>`:`<option value="0">Iluminación</option>`;
            editDevFormHTML += this.devList[i].type == 1 ?`<option value="1" selected>Persiana</option>`   :`<option value="1">Persiana</option>`;
            editDevFormHTML += this.devList[i].type == 2 ?`<option value="2" selected>Otro</option>`       :`<option value="2">Otro</option>`
            editDevFormHTML += `</select><label>Type</label></div></div>`;
            editDev.innerHTML = editDevFormHTML;
            
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems);
            
            M.updateTextFields();

            let addButton = document.getElementById(`editButton_${i}`);
            addButton.addEventListener("click",this);
        }
        
        //Evento de click en el boton lapiz del formulario que debe llamar al metodo PUT para modificar dispositivo
        if (e.type == "click" && objetoEvento.id.startsWith("editButton_")) {
            let index: number = Number(objetoEvento.id.substring(11));
            let editDevName = document.getElementById("editDeviceName") as HTMLInputElement;
            let editDevDescp = document.getElementById("editDeviceDescription") as HTMLInputElement;
            let editDevType = document.getElementById("editDeviceType") as HTMLInputElement;
        
            if(editDevName.value != "") {
                let data = { "id": this.devList[index].id, "key": "name", "value": editDevName.value };
                this.queryServer.query("PUT","http://localhost:8000/update", this, data);
            }

            if(editDevDescp.value != "") {
                let data = { "id": this.devList[index].id, "key": "description", "value": editDevDescp.value };
                this.queryServer.query("PUT","http://localhost:8000/update", this, data);
            }

            if(Number(editDevType.value) != this.devList[index].type) {
                let data = { "id": this.devList[index].id, "key": "type", "value": Number(editDevType.value) };
                this.queryServer.query("PUT","http://localhost:8000/update", this, data);
            }   
            
            if(editDevName.value == "" && editDevDescp.value == "" &&  Number(editDevType.value) == this.devList[index].type)
                M.toast({html: 'Device not modified'});
            else
                this.queryServer.query("GET", "http://localhost:8000/devices", this);
        }

//=================================================================

//========================== List Event  ==========================

        // Evento de click en botón de listar dispositivos
        if (e.type == "click" && objetoEvento.id == "listDevice") {
            this.queryServer.query("GET", "http://localhost:8000/devices", this);
         }

//=================================================================

//=========================== Add Event  ==========================

        // Evento de click en el botón principal de agregar dispositivo que debe cargar el dashboard con el formulario para agregar dispositivo
        if (e.type == "click" && objetoEvento.id == "addDevice") {
            let newDev = document.getElementById("dashboard");
            let devFormHTML: string = `<div class="row">
                <div class="input-field col s12 m12 l12 xl12">
                    <a class="btn-floating btn-large waves-effect waves-light red align right"><i class="material-icons" id="addButton">add</i></a>
                </div>
                <div class="input-field col s12 m12 l12 xl12">
                    <i class="material-icons prefix">devices</i>
                    <label for="addDeviceName">Name</label>
                    <input type="text" id="addDeviceName" class="autocomplete" value="">
                </div>
                <div class="input-field col s12 m12 l12 xl12">  
                    <i class="material-icons prefix">perm_device_information</i>
                    <label for="addDeviceDescription">Description</label>
                    <input type="text" id="addDeviceDescription" class="autocomplete">
                </div>
                <div class="input-field col s12 m12 l12 xl12">
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
            
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems);

            let addButton = document.getElementById("addButton");
            addButton.addEventListener("click",this);
        }

        // Evento de click en el boton + del formulario que debe llamar al metodo POST para agregar dispositivo
        if (e.type == "click" && objetoEvento.id == "addButton") {
            let addDevName = document.getElementById("addDeviceName") as HTMLInputElement;
            let addDevDescp = document.getElementById("addDeviceDescription") as HTMLInputElement;
            let addDevType = document.getElementById("addDeviceType") as HTMLInputElement;
            let name:string = addDevName.value;
            let description:string = addDevDescp.value;
            let type:number = Number(addDevType.value);
            if( name == "" || description == "" || type == -1){
                M.toast({html: 'New Device not configured'});
                return;
            } else {
                let datos = { "name": name, "description": description, "type": type };
                this.queryServer.query("POST","http://localhost:8000/add", this, datos);
            }
            console.log(name + " " + description + " " + type);

            this.queryServer.query("GET", "http://localhost:8000/devices", this);
         }

//=================================================================

//========================= Delete Event  =========================

        // Evento de click en el boton principal que debe cargar el dashboard con el formulario para borrar dispositivo
        if (e.type == "click" && objetoEvento.id == "deleteDevice") {
            let newDev = document.getElementById("dashboard");
            let devFormHTML: string = `<div class="row">
                <div class="input-field col s12 m12 l12 xl12">
                    <a class="btn-floating btn-large waves-effect waves-light red align right"><i class="material-icons" id="deleteButton">delete_forever</i></a>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12 m12 l12 xl12">
                    <i class="material-icons prefix">menu</i>
                    <select id="deleteDeviceId">
                        <label>Devices</label>
                        <option value="0" disabled selected>Choose Device</option>`;
            for(let dev of this.devList) {
                devFormHTML+=`<option value="${dev.id}">${dev.name}</option>`
            }
            devFormHTML+= `</select>
                 </div>
            </div>`;
            newDev.innerHTML = devFormHTML;

            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems);

            let deleteButton = document.getElementById("deleteButton");
            deleteButton.addEventListener("click",this);
        }

        // Evento de click en el boton borrar en el formulario que debe borrar un dispositovo invocando al metodo DELETE
        if (e.type == "click" && objetoEvento.id == "deleteButton") { 
            let delDev = document.getElementById("deleteDeviceId") as HTMLInputElement;
            let id:number = Number(delDev.value); // del select del formulario obtengo que dispositivo se eligio

            if(id > 0) { // ids mayores a cero son ids validos
                let datos = { "id": id };
                this.queryServer.query("DELETE","http://localhost:8000/delete", this, datos);
                this.queryServer.query("GET", "http://localhost:8000/devices", this);
            } else { // significa que no se selecciono un dispositivo
                M.toast({html: 'Device not selected'});
            }
        }
    }

//=================================================================

//==================== Server Request Handlers ====================

    // Manejador de la respuesta del servidor al método GET, que debe cargar la lista de dispositivos en el dashboard
    handlerGET(status:number,response:string):void {
        if (status != 200) 
            return;
        this.devList = JSON.parse(response);
        let devListDiv = document.getElementById("dashboard");
        let devListHTML: string = `<ul class="collection">`;
        for (let dev of this.devList) {
            devListHTML += `<li class="collection-item avatar">`
            switch(dev.type) {
                case 0: {
                    devListHTML += `<img src="../static/images/lightbulb.png" alt="" class="circle">`;
                    break;
                    }
                case 1: {
                    devListHTML += `<img src="../static/images/window.png" alt="" class="circle">`;
                    break;
                }
                default: {
                    devListHTML += `<img src="../static/images/unknow.png" alt="" class="circle">`;
                    break;
                }
            }   
            devListHTML +=  `<span class="title">${dev.name}</span>
                             <p>${dev.description}</p>
                             <div class="secondary-content"> <div class="switch">
                                <a class="btn-floating btn-small waves-effect waves-light blue align right"><i class="material-icons" id="edit_${dev.id}">edit</i></a>
                             </div></div>
                             <div class=""> <div class="switch">
                                <form action="#">
                                    <p class="range-field">
                                        <input type="range" id="slider_${dev.id}" min="0" max="1" step="0.01" value="${dev.state}"/>
                                    </p>
                                </form>
                             </div></div>
                             
                            </li>`;
        }
        devListHTML += `</ul>`
        devListDiv.innerHTML = devListHTML;

        for(let dev of this.devList) {
            let slider = document.getElementById("slider_" + dev.id);
            let edit = document.getElementById("edit_" + dev.id);
            slider.addEventListener("click",this);
            edit.addEventListener("click",this);
        }
    }
    
    handlerPOST(status:number,response:string):void {
        if (status != 200 && status != 201) {
            M.toast({html: `Something went wrong when trying to add device.`});
            return;
        }
        M.toast({html:"Device Added."});
    }
    
    handlerPUT(status:number,response:string):void {
        if (status != 200) {
            M.toast({html: `Something went wrong when trying to update device.`});
            return;
        }
        let resp =  JSON.parse(response);
        if(resp.key == "state")
            M.toast({html: "Device Updated " + resp.key +" to " + resp.value*100 + "%"});
        else
            M.toast({html: "Device Updated " + resp.key +" to " + resp.value});
    };

    handlerDELETE(status:number,response:string):void {
        if (status != 200) {
            M.toast({html: `Something went wrong when trying to delete device.`});
            return;
        }
        let resp = JSON.parse(response);
        M.toast({html: `Device deleted (${resp.id})`});
    }
}

//========================== On Load Event ==========================

window.addEventListener("load", ()=> {
    let btnListDevice = document.getElementById("listDevice");
    let btnAddDevice = document.getElementById("addDevice");
    let btnDeleteDevice = document.getElementById("deleteDevice");
    let main: Main = new Main();

    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems);
 
    btnListDevice.addEventListener("click", main);
    btnAddDevice.addEventListener("click", main);
    btnDeleteDevice.addEventListener("click", main);
});