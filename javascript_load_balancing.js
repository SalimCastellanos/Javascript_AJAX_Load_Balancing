/*
* This is a javascript library that allows AJAX load balancing to a Web server farm.
* 
* Author  :  Salim A. Castellanos R.
* Company :  Quipux Innova.
* Version :  0.0.4
*
*/

var $UTIL = {
        AJAX:{}
};

$UTIL.AJAX.BALANCING = function(resources, config){
    
    var balancing = this;
    
    var resources = resources;
    var config = config;
    var donde = 0;
    var milliseconds = 10000;
    
       
    /*
    * Función que invoca la funcionalidad de balanceo de carga.
    */
    function callBalancing(servicio){
        return balancing[config.algoritm](servicio)
    }
    
    /*
    * Metodo de balanceo Round-Robin
    */
    balancing.round_robin = function (servicio){
        var auxUrl = "";
        if(donde<(config.nodes.length-1)){
            donde=donde+1;
        }
        else{
            donde = 0;
        }
        if(!config.nodes[donde].status){
            //alert("va a recorrer porque el nodo que le toca no esta activo: "+config.nodes[donde].url);
            balancing.round_robin(servicio);
        }

        var auxUrl = config.nodes[donde].url + servicio.url
       // alert("urlTipo: "+auxUrl);
         
         return auxUrl;
    }
        
    /*
    * Se inicia la creación de los objetos AJAX
    */
    
    balancing.resources = {}
    
    agregarServicio = function(servicio){
        balancing.resources[servicio.name] = function(data,callSuccess,callError){
           
            var serUrl = callBalancing(servicio);
            var hh = 22;
            $.ajax({
            url: serUrl,
            type: servicio.method,
            async: servicio.async,
            data: data,
            cache: servicio.cache,
            success: function(respuesta) {
                callSuccess(respuesta);
            },
            error: function(err) {
                callError(err);
            }
        });
        };
    }
    
    balancing.setConfig = function(config1){
        config = config1;
    }
    
    balancing.getConfig = function(){
        return config;
    }
    
    balancing.setResources = function(resources1){
        resources = resources1;
    }
    
    balancing.getResources = function(){
        return resources;
    }
    
     /*
    * Verificación de que los servicios esten arriba
    */
    var verificacionServers = function(){
        //alert("va a ejecutar escaneo de servers")
         for(var i=0; i<config.nodes.length; i++){
            config.nodes[i]['status'] = false;
         }
        
        for(var i=0; i<config.nodes.length; i++){
            $.ajax({
                url: config.nodes[i].url + config.serviceStatus,
                type: "GET",
                async: false,
                cache: false,
                success: function(respuesta) {
                   // alert("server bien: "+config.nodes[i].url);
                   config.nodes[i].status = true;
                },
                error: function(err) {
                  //  alert("server mal: "+config.nodes[i].url);
                }
        });
        }
    
       for(var i=0; i<resources.length; i++){
                var servicio = resources[i];
                agregarServicio(servicio);
        }
    }
    
    verificacionServers();
    setInterval(verificacionServers, milliseconds);

    return balancing;

};