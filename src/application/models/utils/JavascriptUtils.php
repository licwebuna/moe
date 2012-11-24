<?php

/**
 * Clase de utileria para respuestas en javascript.
 *
 * @author Jose Alavez
 * @since 24/11/2012
 * @version 1.0.0
 */
final class JavascriptUtils {

    public static function ejecutar() {

        $str = "<script type='text/javascript'>";

        foreach (func_get_args() as $arg) {
            $str .= $arg;
        }

        $str .= "</script>";

        return $str;
    }

}

?>
