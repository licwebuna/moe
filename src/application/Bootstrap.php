<?php
include APPLICATION_PATH . '/controllers/plugins/SecurityController.php';

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap {

    protected function _initTranslate() {
        $lang_path = APPLICATION_PATH . '/configs/lang/';
        $es_CR = $lang_path . 'es_CR.php';
        $en_CR = $lang_path . 'en_CR.php';

        //se configura la traducción para el español
        $translate = new Zend_Translate(array(
                    'adapter' => 'array',
                    'content' => $es_CR,
                    'locale' => 'es_CR'
                ));

        //se agrega la traducción para el ingles
        $translate->addTranslation(array(
            'content' => $en_CR,
            'locale' => 'en_CR'
        ));

        $registry = Zend_Registry::getInstance();
        $registry->set('Zend_Translate', $translate);

        //se establece el lenguaje que se utilizará
        $translate->setLocale('es_CR');
    }

    protected function _initRegisterPlugins() {
        $this->bootstrap('Frontcontroller')
                ->getResource('Frontcontroller')
                ->registerPlugin(new SecurityController());
    }

}
