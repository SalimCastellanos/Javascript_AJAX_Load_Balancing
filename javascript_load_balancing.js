/*
* This is a javascript library that allows AJAX load balancing to a Web server farm.
* 
* Author  :  Salim A. Castellanos R.
* Company :  Quipux Innova.
* Version :  0.0.1
*
*/

var co.com.quipux.balancing = function(config){
    
    var balancing = this;
    
    balancing.config = config;
    
    balancing.setConfig = function(config){
        this.config = config;
    }
    
    balancing.getConfig = function(){
        return balancing.config;
    }
    
    
    
};
