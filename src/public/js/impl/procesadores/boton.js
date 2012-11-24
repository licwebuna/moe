define(["jquery", "js/impl/procesador"], function($){
    $.fn.moeProcesador.agregar("boton", "button", function(){
        $(this).button();
    });
});