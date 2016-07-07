(function() {
    'use strict';
    
    angular
    .module('exception')
    .config(exceptionConfig);

    /** @ngInject */
    function exceptionConfig($provide) {
        $provide.decorator('$log', extendExceptionHandler);
    }

    function extendExceptionHandler($delegate, logging) {
        logging.enabled = true;
        var methods = {
            error: function() {
                if (logging.enabled) {
                    $delegate.error.apply($delegate, arguments);
                    logging.error.apply(null, arguments);
                }
            },
            log: function() {
                if (logging.enabled) {
                    $delegate.log.apply($delegate, arguments);
                    logging.log.apply(null, arguments);
                }
            },
            info: function() {
                if (logging.enabled) {
                    $delegate.info.apply($delegate, arguments);
                    logging.info.apply(null, arguments);
                }
            },
            debug: function() {
                if(logging.enabled) {
                    $delegate.debug.apply($delegate, arguments);
                    logging.debug.apply(null, arguments);
                }
            },
            warn: function() {
                if (logging.enabled) {
                    $delegate.warn.apply($delegate, arguments);
                    logging.warn.apply(null, arguments);
                }
            }
        };
        return methods;
    }
})();