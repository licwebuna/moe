define(["jquery", "js/core/ejecutor", "js/lib/utils", "js/core/data_daemon"], 
    
    function($, ejecutor, utils, daemon){
        $.fn.moeValidador = function(metodo){
            var parametros = utils.obtieneParametros(arguments, 1);
        
            return this.each(function(){
                ejecutor.ejecutar($(this), contexto, metodo , parametros);
            })
        }
    
        var contexto = "validador";
    
        $.fn.moeValidador.agregar = function(metodo, selector, funcion){
            ejecutor.agregarEjecutable(contexto, metodo, selector, funcion);
            daemon.onData(selector, funcion);
        }
    });