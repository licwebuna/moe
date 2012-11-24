define(["jquery", "js/core/ajax", "js/impl/procesador", "validador"], 
    function($, core_ajax){
    
        function procesarCallbackForm(form){
            return function(dom, informacion, data, textStatus){
                desbloquearSubmitForm(dom);
            }
        }
        function bloquearSubmitForm(form){
            form.find("input[type=submit]").each(function(){
                var $this = $(this);
                $this.addClass("ui-button-disabled").attr("disabled", true);
            });
        }
        function desbloquearSubmitForm(form){
            form.find("input[type=submit]").each(function(){
                $(this).removeAttr("disabled").removeClass("ui-state-hover").removeClass("ui-state-focus").removeClass("ui-button-disabled");
            });
        }
    
        $.fn.moeProcesador.agregar("form", "form&.ajax", function(){
            var $this = $(this);

            $this.submit(function(e){
                if($this.valid()){
                    bloquearSubmitForm($this);
                    core_ajax.load($this,{
                        "url" : $this.attr("action"), 
                        "data" : $this.serialize(), 
                        "postLoad" :  procesarCallbackForm($this),
                        "bloquear": true
                    });
                }
                return false;
            });
        });
    });