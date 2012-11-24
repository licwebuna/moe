<?php

require_once APPLICATION_PATH . '/models/utils/MessageUtils.php';

/**
 * Permite autenticar y autorizar los usuarios que interactuan con el sistema.
 * 
 * @author Cesar Ramirez, Jose Alavez
 * @since 26/08/12 
 * @version 1.0.0
 */
class SecurityController extends Zend_Controller_Plugin_Abstract {

    private $paginas_excluidas =
            array("index", "login", "logout");

    private function esPaginaExcluida($accion) {
        return in_array($accion, $this->paginas_excluidas);
    }

    private function ejecutarValidacionUsuarioLoggeado() {
//        return true;
    }

    private function ejecutarValidacionSesionValida() {
//        return true;
    }

    private function ejecutarValidacionConPrivilegios() {
//        return true;
    }

    private function errorAutentificacion(
    Zend_Controller_Request_Abstract $request, $contoller, $accion) {
        $this->redireccionarUsuario($request, $contoller, $accion);
    }

    private function errorAutorizacion(
    Zend_Controller_Request_Abstract $request, $contoller, $accion) {
        $this->redireccionarUsuario($request, $contoller, $accion);
    }

    private function errorSesionInvalida(
    Zend_Controller_Request_Abstract $request, $contoller, $accion) {
        MessageUtils::showError("Error de Autentificación:", "Sesión Inválida", "#errores_validacion");
        $this->redireccionarUsuario($request, $contoller, $accion);
    }

    private function redireccionarUsuario(
    Zend_Controller_Request_Abstract $request, $contoller, $accion) {
        $request->setModuleName('default')
                ->setControllerName($contoller)
                ->setActionName($accion)
                ->setDispatched(FALSE);
    }

    public function preDispatch(Zend_Controller_Request_Abstract $request) {
        parent::preDispatch($request);
        if (!$this->esPaginaExcluida($request->getActionName())) {
            if (!$this->ejecutarValidacionSesionValida()) {
                $this->errorSesionInvalida($request, "index", "login");
            }
            if (!$this->ejecutarValidacionUsuarioLoggeado()) {
                $this->errorAutentificacion($request, "index", "login");
            }
            if (!$this->ejecutarValidacionConPrivilegios()) {
                $this->errorAutorizacion($request, "index", "login");
            }
        }
    }

}

?>
