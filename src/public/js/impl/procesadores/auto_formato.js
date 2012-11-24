define(["jquery", "js/impl/procesador", "auto_numerico"], function($){
    
    $.autoNumeric.defaults.aSep = '.';
    $.autoNumeric.defaults.aDec = ',';
    $.autoNumeric.defaults.vMax = '999999999999999999999999999.99';
    $.autoNumeric.defaults.vMin = '-999999999999999999999999999.99';
    
    function preparaAutoformatoDigitos(dom, opciones){
        dom.autoNumeric($.extend({
            mDec: '0'
        }, opciones));
    }
    
    function preparaAutoformatoNumeros(dom, opciones){
        dom.autoNumeric($.extend({}, opciones));
    }
    
    function preparaAutoformatoColones(dom, opciones){
        dom.autoNumeric($.extend({
            aSign : "¢"
        }, opciones));
        dom.data("autoformato", true);
    }
    
    function preparaAutoformatoDolares(dom, opciones){
        dom.autoNumeric($.extend({
            aSign : "$"
        }, opciones));
        dom.data("autoformato", true);
    }
    
    function preparaAutoformatoPorcentaje(dom, opciones){
        dom.autoNumeric($.extend({
            aSign : "%",
            pSign: 's',
            vMin: '0',
            vMax: '100'
        }, opciones));
        dom.data("autoformato", true);
    }
    
    $.fn.moeProcesador.agregar("autoformato", 
        "input[data-digito]," +
        "input[data-numero]," +
        "input[data-max]," +
        "input[data-min]," +
        "input[data-rango]," +
        "input[data-colon]," +
        "input[data-dolar]," +
        "input[data-porcentaje]," +
        "input[data-decimal]," +
        "textarea[data-digito]," +
        "textarea[data-numero]," +
        "textarea[data-max]," +
        "textarea[data-min]," +
        "textarea[data-colon]," +
        "textarea[data-dolar]," +
        "textarea[data-porcentaje]," +
        "textarea[data-decimal]," +
        "textarea[data-rango]", 
        function (){
            var $this = $(this), opciones = {};
        
            if(
                $this.attr("data-decimal") || $this.attr("data-decimal") == ''){
                opciones = $.extend(opciones,{
                    mDec : $this.attr("data-decimal")
                });
            }
        
            if(
                $this.attr("data-digito") || $this.attr("data-digito") == ''){
                preparaAutoformatoDigitos($this, opciones);
            } else if(
                $this.attr("data-numero") || $this.attr("data-numero") == '' ||
                $this.attr("data-max") || $this.attr("data-max") == '' ||
                $this.attr("data-min") || $this.attr("data-min") == '' ||
                $this.attr("data-rango") || $this.attr("data-rango") == '' ){
                preparaAutoformatoNumeros($this, opciones);
            }else if(
                $this.attr("data-colon") || $this.attr("data-colon") == '' ){
                preparaAutoformatoColones($this, opciones);
            }else if(
                $this.attr("data-dolar") || $this.attr("data-dolar") == '' ){
                preparaAutoformatoDolares($this, opciones);
            }else if(
                $this.attr("data-porcentaje") || $this.attr("data-porcentaje") == '' ){
                preparaAutoformatoPorcentaje($this, opciones);
            }
        
        });
});