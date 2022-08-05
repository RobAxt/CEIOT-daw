interface ResponseListener{
    handlerGET(status:number,response:string):void;
    handlerPOST(status:number,response:string):void;
    handlerPUT(status:number,response:string):void;
    handlerDELETE(status:number,response:string):void;
}