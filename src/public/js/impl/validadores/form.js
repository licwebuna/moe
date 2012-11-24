define(["jquery", "js/core/ajax", "js/lib/utils", "js/impl/procesadores/auto_formato", "js/impl/validador", "validador"], 
    function($, core_ajax, utils){
    
        // Validadores generales
        $.validator.addMethod("data-requerido", function(v, e, p) { 
            return $.validator.methods.required.call(this, v, e, new Boolean(p));
        }, $.validator.messages.data_requerido);
    
        // -------------------------------------------------------------------------
    
        // Validadores numerales
        $.validator.addMethod("data-digito", function(v, e, p) { 
            return $.validator.methods.digits.call(this, 
                utils.haciaNumero(v, $(e).data("autoformato")), e, p);
        }, $.validator.messages.data_digito);
    
        $.validator.addMethod("data-numero", function(v, e, p) { 
            return $.validator.methods.number.call(this, 
                utils.haciaStringNumerico(v, $(e).data("autoformato")), e, p);
        }, $.validator.messages.data_numero);
    
        $.validator.addMethod("data-max", function(v, e, p) { 
            return $.validator.methods.max.call(this, 
                utils.haciaNumero(v, $(e).data("autoformato")), e, utils.haciaNumero(p));
        }, $.validator.messages.data_max);
    
        $.validator.addMethod("data-min", function(v, e, p) { 
            return $.validator.methods.min.call(this, 
                utils.haciaNumero(v, $(e).data("autoformato")), e, utils.haciaNumero(p));
        }, $.validator.messages.data_min);
    
        $.validator.addMethod("data-rango", function(v, e, p) { 
            return $.validator.methods.range.call(this, 
                utils.haciaNumero(v, $(e).data("autoformato")), e, utils.haciaArregloNumerico(p));
        }, $.validator.messages.data_rango);
        
        $.validator.addMethod("data-colon", function(v, e, p) { 
            return $.validator.methods.number.call(this, 
                utils.haciaStringNumerico(v, $(e).data("autoformato")), e, p);
        }, $.validator.messages.data_colon);
        
        $.validator.addMethod("data-dolar", function(v, e, p) { 
            return $.validator.methods.number.call(this, 
                utils.haciaStringNumerico(v, $(e).data("autoformato")), e, p);
        }, $.validator.messages.data_dolar);
        
        $.validator.addMethod("data-porcentaje", function(v, e, p) { 
            return $.validator.methods.range.call(this, 
                utils.haciaNumero(v, $(e).data("autoformato")), e, [0, 100]);
        }, $.validator.messages.data_porcentaje);
    
        // -------------------------------------------------------------------------
    
        // Validadores texto
        $.validator.addMethod("data-maxl", function(v, e, p) { 
            return $.validator.methods.maxlength.call(this, v, e, p);
        }, $.validator.messages.data_maxl);
    
        $.validator.addMethod("data-minl", function(v, e, p) { 
            return $.validator.methods.minlength.call(this, v, e, p);
        }, $.validator.messages.data_minl);
    
        $.validator.addMethod("data-rangol", function(v, e, p) { 
            return $.validator.methods.rangelength.call(this, v, e, utils.haciaArregloNumerico(p));
        }, $.validator.messages.data_rangol);

        // -------------------------------------------------------------------------
    
        // Validadores fecha
        $.validator.addMethod("data-fecha", function(v, e, p) { 
            return this.optional(e)||!/Invalid|NaN|null/.test(Date.parseExact(v, "dd/MM/yyyy"))
        }, $.validator.messages.data_fecha);
    
        $.validator.addMethod("data-hora", function(v, e, p) { 
            return this.optional(e)||!/Invalid|NaN|null/.test(Date.parseExact(v, "hh:mm:ss tt"))
        }, $.validator.messages.data_hora);
    
        $.validator.addMethod("data-fechahora", function(v, e, p) { 
            return this.optional(e)||!/Invalid|NaN|null/.test(Date.parseExact(v, "dd/MM/yyyy hh:mm:ss tt"))
        }, $.validator.messages.data_fechahora);
    
        $.validator.addMethod("data-fechapatron", function(v, e, p) { 
            return this.optional(e)||!/Invalid|NaN|null/.test(Date.parseExact(v, p[0]))
        }, $.validator.messages.data_fechapatron);
    
        // -------------------------------------------------------------------------
    
        $.validator.addMethod("data-email", function(v, e, p) { 
            return $.validator.methods.email.call(this, v, e, p);
        }, $.validator.messages.data_email);

        // -------------------------------------------------------------------------
        
        $.validator.addMethod("data-url", function(v, e, p) { 
            return $.validator.methods.url.call(this, v, e, p);
        }, $.validator.messages.data_url);

        // -------------------------------------------------------------------------

        $.validator.addMethod("data-archivos", function(v, e, p) { 
            return $.validator.methods.accept.call(this, v, e, p);
        }, $.validator.messages.data_archivos);
    
        // -------------------------------------------------------------------------

        $.validator.addMethod("data-credito", function(v, e, p) { 
            return $.validator.methods.creditcard.call(this, v, e, p);
        }, $.validator.messages.data_credito);
    
        // -------------------------------------------------------------------------

        $.validator.addMethod("data-igualdad", function(v, e, p) { 
            return $.validator.methods.equalTo.call(this, v, e, p);
        }, $.validator.messages.data_igualdad);
    
        // -------------------------------------------------------------------------

        $.validator.addMethod("data-remoto", function(v, e, p) { 
            if ( this.optional(e) ){
                return "dependency-mismatch";
            }

            var previous = this.previousValue(e);
            
            if (!this.settings.messages[e.name]){
                this.settings.messages[e.name] = {};
            }
            
            previous.originalMessage = this.settings.messages[e.name].remote;
            this.settings.messages[e.name].remote = previous.message;

            p = typeof param == "string" && {
                url:p
            } || p;

            if ( this.pending[e.name] ) {
                return "pending";
            }
            
            if ( previous.old === v ) {
                return previous.valid;
            }

            previous.old = v;
            var validator = this;
            var data = {};
            data[e.name] = v;
            this.startRequest(e);
            
            core_ajax.load(e, {
                "url" : p, 
                "data" : data, 
                "type" : "json", 
                "postLoad" : function(dom, info, data){
                    validator.settings.messages[e.name].remote = previous.originalMessage;
                    var valid = data.estado;
                    if ( valid ) {
                        validator.settings.unhighlight.call(
                            validator, e, validator.settings.errorClass, validator.settings.validClass );
                        
                        var submitted = validator.formSubmitted;
                        validator.prepareElement(e);
                        validator.formSubmitted = submitted;
                        validator.successList.push(e);
                        validator.showErrors();
                    } else {
                        var errors = {};
                        var message = data.mensaje || validator.defaultMessage( e, "remote" );
                        errors[e.name] = previous.message = $.isFunction(message) ? message(v) : message;
                        validator.showErrors(errors);
                    }
                    previous.valid = valid;
                    validator.stopRequest(e, valid);
                }  
            });
            
            return "pending";
        }, $.validator.messages.data_remoto);
        
    
        $.fn.moeValidador.agregar("form", "form", function(){
            jQuery(this).validate();
        });
    });