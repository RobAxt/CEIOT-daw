class QueryServer {          
    public query(metodo: string, url: string,listener:ResponseListener, data?:any) {
      let xmlHttp: XMLHttpRequest = new XMLHttpRequest();
          xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4) {
                if(metodo == "GET")
                    listener.handlerGET(xmlHttp.status,xmlHttp.responseText);
                if(metodo == "POST" )
                    listener.handlerPOST(xmlHttp.status,xmlHttp.responseText);
                if(metodo == "PUT")
                    listener.handlerPUT(xmlHttp.status,xmlHttp.responseText);
                if(metodo == "DELETE")
                    listener.handlerDELETE(xmlHttp.status,xmlHttp.responseText);
              }
          }
          xmlHttp.open(metodo, url, true);
          if (metodo == "POST" || metodo == "PUT" || metodo == "DELETE") {
            xmlHttp.setRequestHeader("Content-Type", "application/json");
            console.log(data)
            xmlHttp.send(JSON.stringify(data));
          } else
            xmlHttp.send();
    }
  }