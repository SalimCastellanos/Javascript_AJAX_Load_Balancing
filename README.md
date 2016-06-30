# Javascript_AJAX_Load_Balancing V 0.0.3

## Libreria javascript para el consumo de servicios AJAX más balanceo de carga utilizando Round-Robin

### Examples

```javascript

/*
* Se crean las variables que encierran la configuración inicial
*/

var configNodes = {
        nodes: [
            {
                url: "http://localhost:9091",
                weight : 2
            },
            {
                url: "http://localhost:9092",
                weight : 3
            }
        ],
        algoritm: "round_robin"
}

var resources = [
    {
        name: "getPosts",
        url : "/posts/",
        method : "GET",
        async : true       
    }
];

/*
* Ejemplo de como se consume un servicio con balanceo de carga Round-Robin
*/

var servicios = $CO.COM.QUIPUX.AJAX.BALANCING(resources, configNodes);
for(var i=0; i<5; i++){
    servicios.resources.getPosts({},
                    function(result){
                        alert("entro exito: "+result);
                    },
                    function(err){
                        alert("entro error: "+err);
                    }
                  );
}

						   
```

### Más información contactar a salimsalim4@gmil.com
