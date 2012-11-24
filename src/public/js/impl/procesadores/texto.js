define(["jquery", "js/impl/procesador"], function($){
    $.fn.moeProcesador.agregar("texto", "input:text", function(){
        this.type = 'text';
    });
});