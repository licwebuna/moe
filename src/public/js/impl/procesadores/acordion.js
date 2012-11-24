define(["jquery", "js/impl/procesador"], function($){
    $.fn.moeProcesador.agregar("acordion", ".acordion", function(){
        var $this = $(this);
        
        var auto = $this.data("auto");
        auto = auto == undefined ? true : auto;
        
        $this.accordion({
            autoHeight: auto
        });
    });
});