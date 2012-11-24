define(["jquery", "js/impl/procesador"], function($){
    $.fn.moeProcesador.agregar("input", "input[type=submit],input[type=button]", function(){
        var $this = $(this);
        
        $this.button();
        if($this.attr("type") == "submit"){
            $this.addClass("ui-botton-submit");
        }
    });
});