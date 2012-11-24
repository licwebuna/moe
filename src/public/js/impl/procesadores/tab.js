define(["jquery",  "js/impl/procesador", "js/impl/procesadores/acordion"], function($){
    $.fn.moeProcesador.agregar("tab", ".tab", function(){
        $(this).tabs();
    });
});