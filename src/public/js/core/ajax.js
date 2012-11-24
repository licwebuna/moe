define(["jquery", "js/lib/utils"], function($, utils){
    
    var id_peticiones = 0,
    listaPeticiones = [],
    callbacksPreLoad = $.Callbacks(),
    callbacksPostLoad = $.Callbacks();
        
    function ejecutarLoad(dom, config){
        id_peticiones++;
        
        var id = dom instanceof $ ? dom : (dom != null ? $(dom) : $(id_peticiones));
        if(!config.bloquear || preValidacionPeticion(id)){
            if(config.animacionMostrar > 0 && dom){
                dom.stop(true,true).fadeOut(config.animacionMostrar);
            }
            agregarPeticion(id, $.post(config.url, config.data,
                function(data, textStatus){
                    removerPeticion(id);
                    if(config.adjuntar && dom){
                        dom.html(data);
                        if(config.animacionOcultar > 0 && dom){
                            dom.stop(true,true).fadeOut(config.animacionOcultar);
                        }
                        dom.stop(true,true).fadeIn(1000);
                    }
                    ejecutarCallbacksPostLoad(dom, config, data, textStatus);
                }, config.type));
            ejecutarCallbacksPreLoad(dom, config);
        }
    }
    function agregarPeticion (id, request){
        postValidacionPeticion(id);
        listaPeticiones[listaPeticiones.length] = {
            "id" : id,
            "request" : request
        };
    }
    function removerPeticion (id){
        var nuevaListaPeticiones = [];
        for(var i in listaPeticiones){
            if(listaPeticiones[i].id != id){
                nuevaListaPeticiones.push(listaPeticiones[i]);
            }
        }
        listaPeticiones = nuevaListaPeticiones;
    }
    function preValidacionPeticion (id){
        for(var i in listaPeticiones){
            if(validarPeticionIgualdad(id, listaPeticiones[i].id) ||
                validarPeticionJerarquia(id, listaPeticiones[i].id)){
                return false;
            }
        }
        return true;
    }
    function postValidacionPeticion (id){
        var nuevaListaPeticiones = [];
        for(var i in listaPeticiones){
            if(validarPeticionIgualdad(id, listaPeticiones[i].id) || 
                validarPeticionJerarquia(id, listaPeticiones[i].id)){
                listaPeticiones[i].request.abort();
            }else{
                nuevaListaPeticiones.push(listaPeticiones[i]);
            }
        }
        listaPeticiones = nuevaListaPeticiones;
    }
    function validarPeticionIgualdad (id, id_lista){
        return id.get(0) == id_lista.get(0);
    }
    function validarPeticionJerarquia (id, id_lista){
        var es_padre = false;
        id_lista.parents().each(
            function(){
                return !(es_padre = id.get(0) == this);
            });
        return es_padre;
    }
    function ejecutarCallbacksPreLoad(dom, config){
        var parametros = [dom, creaInformacionCallback(config)];
        callbacksPreLoad.fireWith(this, parametros);
        utils.callback(this, config.preLoad, parametros);
    }
    function ejecutarCallbacksPostLoad(dom, config, data, textStatus){
        var parametros = [dom, creaInformacionCallback(config), data, textStatus];
        callbacksPostLoad.fireWith(this, parametros);
        utils.callback(this, config.postLoad, parametros);
    }
    function creaInformacionCallback(config){
        return {
            "url" : config.url, 
            "data" : config.data, 
            "type" : config.type, 
            "adjuntar": config.adjuntar,
            "bloquear": config.bloquear
        };
    }
        
    return {
        load : function(dom, config){
            ejecutarLoad(dom, $.extend({
                "url" : "", 
                "data" : null, 
                "type" : null, 
                "adjuntar": false,
                "bloquear": false,
                "preLoad" : null,
                "postLoad" : null,
                "animacionMostrar" : 700,
                "animacionOcultar" : 700
            }, config));
        },
        onPostLoad : function(funcion){
            callbacksPostLoad.add(funcion);
        },
        onPreLoad : function(funcion){
            callbacksPreLoad.add(funcion);
        } ,
        offPostLoad : function(funcion){
            if(funcion == undefined){
                callbacksPostLoad.empty();
            }
            callbacksPostLoad.remove(funcion);
        } ,
        offPreLoad : function(funcion){
            if(funcion == undefined){
                callbacksPreLoad.empty();
            }
            callbacksPreLoad.remove(funcion);
        } ,
        existenPeticionesPendientes : function(){
            return listaPeticiones.length > 0;
        } ,
        cantidadPeticionesPendientes : function(){
            return listaPeticiones.length;
        }
    }
});