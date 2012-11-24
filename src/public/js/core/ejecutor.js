define(["jquery", "js/lib/utils"], function($, utils){
    
    var metodos = [];
 
    function prepararMetodo(dom, contexto, metodo, parametros){
        if(metodo != undefined){
            ejecutarMetodo(dom, contexto, metodo, parametros);
        }else{
            for(var m in metodos[contexto]){
                ejecutarMetodo(dom, contexto, m, parametros);
            }
        }
    }
    function ejecutarMetodo(dom, contexto, metodo, parametros){
        dom.find(metodos[contexto][metodo].selector).each(function(){
            metodos[contexto][metodo].funcion.apply(this, parametros);
        });
    }

    return {
        ejecutar : function(dom, contexto, metodo, parametros){
            prepararMetodo(dom, contexto, metodo, parametros);
        },
        agregarEjecutable : function(contexto, metodo, selector, funcion){
            if(metodos[contexto] == undefined){
                metodos[contexto] = [];
            }
            
            metodos[contexto][metodo] = {
                "selector" : selector,
                "funcion" : funcion
            }
        },
        removerEjecutable : function(contexto, metodo){
            if(metodo != undefined){
                utils.removerValor(metodos[contexto], metodo, "metodo");
            }else{
                utils.removerLlave(metodos, contexto);
            }
        },
        limpiarEjecutables : function(){
            metodos = [];
        }
    }
});