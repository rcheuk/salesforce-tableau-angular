(function() {
    'use strict';

    angular
    .module('exception')
    .factory('logging', logging);

    /** @ngInject */
    function logging($injector, $window, serverHost, serverPort) {
        var log = function() {
            var args = [];
            if (typeof arguments === 'object') {
                for(var i = 0; i < arguments.length; i++ ) {
                    var arg = arguments[i];
                    var exception = {};
                    if (arg) {
                        exception.message = arg.message;
                        exception.stack = arg.stack;
                        args.push(JSON.stringify(exception));
                    }
                    
                }
            }

            var eventLogDateTime = moment(new Date()).format('LLL');
            
            //replace with appropriate logging url
            var url = "https://" + serverHost + ":" + serverPort + "/logs/error"
            
            var logItem =  angular.toJson({
                                errorUrl: $window.location.href,
                                time: eventLogDateTime,
                                type: type,
                                errorMessage: args.join('\n')
                            });
            
            /** Only send messages to server if an errror or warning */
            if (type === 'error' || type === 'warn') {
                $.ajax({
                    type: "POST",
                    url: url,
                    contentType: "application/json",
                    data: logItem
                });
            }
        };

        var service = {
            error: error,
            warn: warn,
            info: info,
            debug: debug,
            enabled: false,
            logs: []
        };
        return service;

        function error() {
            self.type = 'error';
            log.apply(self, arguments);
        }

        function warn() {
            self.type = 'warn';
            log.apply(self, arguments);
        }

        function debug() {
            self.type = 'debug';
            log.apply(self, arguments);
        }

        function info() {
            self.type = 'info';
            log.apply(self, arguments);
        }

        function logtype() {
            self.type = 'log';
            log.apply(self, arguments);
        }
    }
})();