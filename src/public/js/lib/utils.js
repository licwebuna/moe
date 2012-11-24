define(["jquery"], function($){
    var utils = {
        callback : function(contexto, funciones, parametros, banderas){
            $.Callbacks(banderas).add(funciones).fireWith(contexto, parametros);
        },
        obtieneParametros :  function(parametros, desde, hasta){
            return [].slice.call(parametros, desde, hasta);
        },
        copiarArreglo : function(arreglo){
            var temp_arreglo = [];
            
            for(var temp_llave in arreglo){
                temp_arreglo[temp_llave] = arreglo[temp_llave];
            }
            
            return temp_arreglo; 
        },
        removerLlave : function(arreglo, llave){
            var temp_arreglo = [];
            
            for(var temp_llave in arreglo){
                if(llave != temp_llave){
                    temp_arreglo[temp_llave] = arreglo[temp_llave];
                }
            }
            
            return temp_arreglo; 
        },
        removerValor : function(arreglo, valor){
            var temp_arreglo = [];
            
            for(var temp_llave in arreglo){
                var temp_valor = arreglo[temp_llave];
                
                for (var i = 2; i < arguments.length ; i++) {
                    temp_valor = temp_valor[arguments[i]];
                }
                
                if(temp_valor != valor){
                    temp_arreglo[temp_llave] = arreglo[temp_llave];
                }
            }
            
            return temp_arreglo; 
        },
        haciaStringNumerico : function(valor, removerCaracteres){
            if(removerCaracteres){
                valor = valor.toString().replace(/[^\d|\,|\.|\-]/g, "");
            }
            
            return valor.replace(/\./g, "@").replace(/\,/g, ".").replace(/\@/g, ",");
        },
        haciaNumero : function(valor, removerCaracteres){
            if(removerCaracteres){
                valor = valor.toString().replace(/[^\d|\,|\.|\-]/g, "");
            }
            
            return Number(valor.toString().replace(/\./g, "").replace(/\,/g, "."));
        },
        haciaArregloNumerico : function(arreglo, mantenerFormato){
            var n = [];
            for(var i in arreglo){
                n[i] = utils.haciaNumero(arreglo[i], mantenerFormato);
            }
            return n;
        }
    };
    
    return utils;
});