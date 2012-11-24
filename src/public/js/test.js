define(["jquery"], function($){
    
    var id_demo_validor = 0;
    
    /**
    *   {
    *      id="",
    *      titulo : "",
    *      descripcion : "",
    *      ejemplo : "",
    *      extra : ""
    *   }
    */
    function creaDemoValidador(opciones){
        var t = $(
            "<table>"+
            "<thead>"+
            "<tr>"+
            "<th class='ht'></th>" +
            "<th class='hd'></th>" +
            "<th class='he'></th>" +
            "</tr>"+
            "</thead>"+
            "<tbody>"+
            "<tr>"+
            "<td class='bt'></td>" +
            "<td>"+
            "   <div class='bd w150'/>" +
            "</td>" +
            "<td>"+
            "   <textarea class='be w600'/>" +
            "</td>" +
            "</tr>"+
            "</tbody>"+
            "</table>");
        
        t.find(".ht").append(opciones.titulo);
        t.find(".hd").append("Descripción");
        t.find(".he").append("Código");
        
        t.find(".bt").append($(opciones.extra)).append($(opciones.ejemplo).attr("id", "ejemplo_" + id_demo_validor++));
        t.find(".bd").append(opciones.descripcion);
        t.find(".be").blur(function(){
            var $this = $(this), destino = t.find(".bt");
            
            destino.children().remove();
            destino.append($($this.val()).attr("id", "ejemplo_" + id_demo_validor++));
            destino.moeProcesador("texto");
            
        }).text(opciones.ejemplo);
        
        if(opciones.id){
            $(opciones.id).append(t);
        }
        
        t.moeProcesador("texto");

        return t;
    }
    
    /**
    *   {
    *      id="",
    *      titulo : "",
    *      descripcion : "",
    *      resultado : "",
    *      ejemplo : ""
    *   }
    */
    function creaDemoAutoformato(opciones){
        var t = $(
            "<table>"+
            "<thead>"+
            "<tr>"+
            "<th class='ht'></th>" +
            "<th class='hd'></th>" +
            "<th class='he'></th>" +
            "</tr>"+
            "</thead>"+
            "<tbody>"+
            "<tr>"+
            "<td class='bt'></td>" +
            "<td>"+
            "   <div class='bd w150'/>" +
            "</td>" +
            "<td>"+
            "   <textarea class='be w600'/>" +
            "</td>" +
            "</tr>"+
            "</tbody>"+
            "</table>");
        
        t.find(".ht").append(opciones.titulo);
        t.find(".hd").append("Descripción");
        t.find(".he").append("Código");
        
        t.find(".bt").append($(opciones.resultado).attr("id", "ejemplo_" + id_demo_validor++));
        t.find(".bd").append(opciones.descripcion);
        t.find(".be").blur(function(){
            var $this = $(this), destino = t.find(".bt");
            
            destino.children().remove();
            destino.append($($this.val()).attr("id", "ejemplo_" + id_demo_validor++));
            destino.moeProcesador("texto");
            destino.moeProcesador("autoformato");
            
        }).text(opciones.ejemplo ? opciones.ejemplo : opciones.resultado);
        
        if(opciones.id){
            $(opciones.id).append(t);
        }
        
        t.moeProcesador("texto");

        return t;
    }
    
    /**
    *   {
    *      id="",
    *      titulo : "",
    *      descripcion : "",
    *      resultado : "",
    *      ejemplo : ""
    *   }
    */
    function creaDemoMascara(opciones){
        var t = $(
            "<table>"+
            "<thead>"+
            "<tr>"+
            "<th class='ht'></th>" +
            "<th class='hd'></th>" +
            "<th class='he'></th>" +
            "</tr>"+
            "</thead>"+
            "<tbody>"+
            "<tr>"+
            "<td class='bt'></td>" +
            "<td>"+
            "   <div class='bd w300'/>" +
            "</td>" +
            "<td>"+
            "   <textarea class='be w600'/>" +
            "</td>" +
            "</tr>"+
            "</tbody>"+
            "</table>");
        
        t.find(".ht").append(opciones.titulo);
        t.find(".hd").append("Descripción");
        t.find(".he").append("Código");
        
        t.find(".bt").append($(opciones.resultado).attr("id", "ejemplo_" + id_demo_validor++));
        t.find(".bd").append(opciones.descripcion);
        t.find(".be").blur(function(){
            var $this = $(this), destino = t.find(".bt");
            
            destino.children().remove();
            destino.append($($this.val()).attr("id", "ejemplo_" + id_demo_validor++));
            destino.moeProcesador("texto");
            destino.moeProcesador("mascara");
            
        }).text(opciones.ejemplo ? opciones.ejemplo : opciones.resultado);
        
        if(opciones.id){
            $(opciones.id).append(t);
        }
        
        t.moeProcesador("texto");

        return t;
    }
    
    return {
        demoValidador : creaDemoValidador ,
        demoMascara : creaDemoMascara ,
        demoAutoformato : creaDemoAutoformato
    }
});
