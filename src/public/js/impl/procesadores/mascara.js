define(["jquery", "js/impl/procesador", "mascara"], function($){
    
    
    function aplicaMascaraGenerica(dom, opciones){
        dom.mask(opciones.mascara);
    }
    
    $.fn.moeProcesador.agregar("mascara", 
        "input[data-mascara]," +
        "textarea[data-mascara]", 
        function (){
            var $this = $(this);
            aplicaMascaraGenerica($this, $.extend({
                mascara : ""
            },{
                mascara : $this.attr("data-mascara")
            }));
        });
});