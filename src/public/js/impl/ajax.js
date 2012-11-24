define(["jquery", "js/core/ajax"], function($, core_ajax){
    $.fn.moeAjax = function(url, datos, callback){
        var configGeneral = $.extend({}, core_ajax.defaults, {
            "url" : url,
            "data" : datos,
            "postLoad" : callback,
            "adjuntar" : true
        });
       
        return this.each(function(){
            var $this = $(this);
            var configDom = $.meta ? $.extend({}, configGeneral, $this.data) : configGeneral;
            core_ajax.load($this, configDom);
        });
    };
    
    $.moeAjax = function(url, datos, callback){
        core_ajax.load(null, {
            "url" : url,
            "data" : datos,
            "postLoad" : callback
        });
    };
});