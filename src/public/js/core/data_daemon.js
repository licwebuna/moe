define(["jquery","js/core/ajax"], function($, core_ajax){
    
    var selectores = [];
    
    core_ajax.onPostLoad(function(dom, informacion){
        if(dom && informacion.adjuntar){
            for(var selector in selectores){
                dom.find(selector).each(function(){
                    selectores[selector].fireWith(this, [$(this).data()]);
                });
            }
        }
    });
            
    return {
        onData : function(selector, funcion){
            if(!selectores[selector]){
                selectores[selector] = $.Callbacks();
            }
        
            selectores[selector].add(funcion);
        }, 
        offData : function(selector, funcion){
            if(selector == undefined){
                selectores = [];
            }else{
                if(funcion == undefined){
                    selectores[selector].empty();
                }else{
                    selectores[selector].remove(funcion);
                }
            }
        }
    }
});