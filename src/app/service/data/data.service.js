(function() {
  'use strict';

  angular
    .module('app')
    .factory('dataService', ['$log', '$http', 'serverHost', 'serverPort', dataService]);

          /** @ngInject */
  function dataService($log, $http, serverHost, serverPort) {

    var service = {
      getData: getData,
    };

    return service;

    /** server host and server port come from the config-env.js file that gets built on build. It pulls in the values from the /config/local.json file to determine what to set the values to. This allows dynamically changing the value between local, dev, production environments. 
     * 
    */
    function getData() {
        var url = '';
        return $http.get(url)
        .then(getDataComplete)
        .catch(getDataFailed);

        function getDataComplete (res) {
            return response.data;
        }

        function getStatesFailed (err) {
            $log.error('XHR Failed for getData. \n' + angular.toJson(error.data, true));
        }
    }
    
  }
})();
