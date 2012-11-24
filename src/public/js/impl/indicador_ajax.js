define(["jquery", "js/core/ajax"], function($, core_ajax){
   
    $.fn.moeIndicadorAjax = function(opciones){
        var configuracionPlugin = $.extend($.fn.moeIndicadorAjax.defaults, opciones);
            
        return this.each(function(){
            var $this = $(this);
            var configuracionDom = $.meta ? $.extend({}, configuracionPlugin, $this.data) : configuracionPlugin;
            
            core_ajax.onPreLoad(function(){
                mostrarIndicadorAjax($this, configuracionDom);
            });
            core_ajax.onPostLoad(function(){
                ocultarIndicadorAjax($this, configuracionDom);
            });
        });
    };

    function mostrarIndicadorAjax(dom, configuracion){
        dom.text(configuracion.texto + cuentaPeticionesPentientes());
        dom.stop(true, true).show(
            configuracion.efectoMostrar, 
            configuracion.opcionesMostrar,
            configuracion.tiempoAnimacionMostrar);
    }
    function ocultarIndicadorAjax(dom, configuracion){
        if(!core_ajax.existenPeticionesPendientes()){
            dom.stop(true, true).hide(
                configuracion.efectoOcultar, 
                configuracion.opcionesOcultar,
                configuracion.tiempoAnimacionOcultar,
                function(){
                    dom.text(configuracion.texto);
                });
        }else{
            dom.text(configuracion.texto + cuentaPeticionesPentientes());
        }
    }
    function cuentaPeticionesPentientes(){
        return (core_ajax.cantidadPeticionesPendientes() > 1) ? 
        "(" + core_ajax.cantidadPeticionesPendientes() + ")" : "";
    }

    $.fn.moeIndicadorAjax.defaults = {
        "texto" : "Cargando ",
        "tiempoAnimacionMostrar" : 500,
        "tiempoAnimacionOcultar" : 500,
        "efectoMostrar" : "fade",
        "efectoOcultar" : "fade",
        "opcionesMostrar" : null,
        "opcionesOcultar" : null
    } 
});