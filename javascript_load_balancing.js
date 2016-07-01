/*
* This is a javascript library that allows AJAX load balancing to a Web server farm.
* 
* Author  :  Salim A. Castellanos R.
* Company :  Quipux Innova.
* Version :  0.0.3
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
    
    /*
    * Función que invoca la funcionalidad de balanceo de carga.
    */
    function callBalancing(url){
        return balancing[config.algoritm](url)
    }
    
    /*
    * Metodo de balanceo Round-Robin
    */
    balancing.round_robin = function (url){
        if(donde<(config.nodes.length-1)){
            donde=donde+1;
        }
        else{
            donde = 0;
        }
        return config.nodes[donde].url + url;
    }
        
    /*
    * Se inicia la creación de los objetos AJAX
    */
    
    balancing.resources = {}
    
    agregarServicio = function(servicio){
        balancing.resources[servicio.name] = function(data,callSuccess,callError){
            $.ajax({
            url: callBalancing(servicio.url),
            type: servicio.method,
            async: servicio.async,
            data: data,
            success: function(respuesta) {
                callSuccess(respuesta);
            },
            error: function(err) {
                callError(err);
            }
        });
        };
    }

    for(var i=0; i<resources.length; i++){
        var servicio = resources[i];
        agregarServicio(servicio);
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

    return balancing;

};