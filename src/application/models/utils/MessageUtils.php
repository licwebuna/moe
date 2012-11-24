<?php

require_once APPLICATION_PATH . '/models/utils/JavascriptUtils.php';

/**
 * Clase de utileria para envio de mensajes (notificaciones) al cliente.
 *
 * @author Jose Alavez
 * @since 24/11/2012
 * @version 1.0.0
 */
final class MessageUtils {

    public static function show($tipo, $titulo, $mensaje, $contenedor = '#mensajes_notificador') {
        echo JavascriptUtils::ejecutar(
                "require(['js/impl/notificador'], function(n){",
                "n.agregar({contenedor:'" . $contenedor . "', ",
                "tipo:'" . $tipo . "',titulo:'" . $titulo . "',mensaje:'" . $mensaje . "'});",
                "});"
        );
    }

    public static function showError($titulo, $mensaje, $contenedor = '#mensajes_notificador') {
        echo MessageUtils::show("error", $titulo, $mensaje, $contenedor);
    }

}

?>
