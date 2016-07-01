# Javascript_AJAX_Load_Balancing V 0.0.4

## Libreria javascript para el consumo de servicios AJAX más balanceo de carga utilizando Round-Robin

### Necesita JQUERY 1.x

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
    },
    {
        name: "getComents",
        url : "/comments/",
        method : "GET",
        async : true       
    }
];

var servicios = $UTIL.AJAX.BALANCING(resources, configNodes);

    servicios.resources.getComents({},
                    function(result){
                        alert("entro exito: "+result);
                    },
                    function(err){
                        alert("entro exito: "+result);
                    }
                  );

						   
```

### Más información contactar a salimsalim4@gmail.com
