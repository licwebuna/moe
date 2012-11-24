<?php

class TestController extends Zend_Controller_Action {

    public function init() {
        
    }

    public function testAction() {
        
    }

    public function ejemploAction() {
        sleep(5);
    }

    public function showcaseAction() {
        
    }

    public function remotoAction() {
        sleep(5);

        $respuesta = array(
            "estado" => $this->getRequest()->getParam("remoto") == "remoto",
            "mensaje" => "El campo esta malo"
        );

        echo json_encode($respuesta);
    }

}

