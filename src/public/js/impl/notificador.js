define(["jquery", "js/lib/utils", "js/core/ajax"], function($, utils, core_ajax){

    var 
    id_mensaje = 0,
    mensajes_visibles = [],
    defaults = {
        "tipo" : null,
        "titulo" : "",
        "mensaje" : "",
        "contenedor" : "#mensajes_notificador",
        "tiempoAnimacionMostrar" : 700,
        "tiempoAnimacionOcultar" : 700,
        "efectoMostrar" : "fade",
        "efectoOcultar" : "fade",
        "opcionesMostrar" : null,
        "opcionesOcultar" : null
    };
    
    core_ajax.onPreLoad(function(){
        ocultarMensajes();
    });

    function mostrarMensaje(opciones){
        var div_mensaje = crearSeccionNotificacion(
            opciones.tipo, opciones.titulo, opciones.mensaje);
        
        var padre = $(opciones.contenedor).append(div_mensaje).css("display", "block");

        div_mensaje.stop(true, true).show(
            opciones.efectoMostrar, 
            opciones.opcionesMostrar,
            opciones.tiempoAnimacionMostrar);

        var id = id_mensaje++;
        mensajes_visibles[id] = {
            contenedor : padre,
            dom : div_mensaje,
            conf : opciones
        };
    }
    
    function tratarContenedorPadre(padre){
        if(padre.find(".notificacion").size() > 0){
            padre.css("display", "block");
        }else{
            padre.css("display", "none");
        }
    }
    
    function ocultarMensajes(){
        var copia = utils.copiarArreglo(mensajes_visibles);
        
        for (var id in copia){
            copia[id].dom.stop(true, true).hide(
                copia[id].conf.efectoOcultar, 
                copia[id].conf.opcionesOcultar,
                copia[id].conf.tiempoAnimacionOcultar,
                function(){
                    copia[id].dom.remove();
                    tratarContenedorPadre(copia[id].contenedor);
                });
        }
        
        mensajes_visibles = [];
    }
    function ocultarMensaje(id){
        if(mensajes_visibles[id] != undefined){
            mensajes_visibles[id].dom.stop(true, true).hide(
                mensajes_visibles[id].conf.efectoOcultar, 
                mensajes_visibles[id].conf.opcionesOcultar,
                mensajes_visibles[id].conf.tiempoAnimacionOcultar,
                function(){
                    mensajes_visibles[id].dom.remove();
                    mensajes_visibles = utils.removerLlave(mensajes_visibles, id);
                    tratarContenedorPadre(mensajes_visibles[id].contenedor);
                });
        }
    }
    
    function crearSeccionNotificacion(tipo ,titulo, mensaje){
        return $('<div style="display:none;" class="ui-widget ui-corner-all notificacion">' +
            '<div class="' + obtieneClaseNotificacion(tipo) + ' contenedor">'+ 
            '<span class="ui-icon '+ obtieneIconoNotificacion(tipo) +'" style="float: left; margin-right: .3em;"></span>'+
            '<strong>' + titulo + '</strong> '+ mensaje +
            '</div>' +
            +'</div>');     
    }
    
    function obtieneIconoNotificacion(tipo){
        var clase = "ui-icon-mail-closed";
        
        if("error" === tipo){
            clase = "ui-icon-alert";
        } else if("advertencia" === tipo){
            clase = "ui-icon-info";
        } 
        
        return clase;
    }
    
    function obtieneClaseNotificacion(tipo){
        var clase = "ui-state-default";
        
        if("error" === tipo){
            clase = "ui-state-error";
        } else if("advertencia" === tipo){
            clase = "ui-state-highlight";
        } 
        
        return clase;
    }
    
    return {
        agregar : function(opciones){
            return mostrarMensaje($.extend(defaults, opciones));
        },
        ocultar : function(id){
            ocultarMensaje(id);
        },
        ocultarTodos : function(id){
            ocultarMensajes();
        }
    }
});