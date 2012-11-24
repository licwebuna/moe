require([
    "jquery", 
    "js/impl/notificador", 
    "js/impl/ajax", 
    "js/impl/procesadores/input",
    "js/impl/procesadores/boton",
    "js/impl/procesadores/form",
    "js/impl/procesadores/texto",
    "js/impl/procesadores/tab",
    "js/impl/procesadores/auto_formato",
    "js/impl/procesadores/mascara",
    "js/impl/validadores/form",
    "js/impl/indicador_ajax"
    ], function($){
        $("#head").moeProcesador("boton");
        $("#indicador_ajax").moeIndicadorAjax();
        
        $('#content').moeAjax('index/login');
    });