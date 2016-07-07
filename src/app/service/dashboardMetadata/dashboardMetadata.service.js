(function() {
  'use strict';

  angular
    .module('app')
    .factory('dashboardMetadataService', ['dashboardMetadata', dashboardMetadataService]);

  /** @ngInject */
  function dashboardMetadataService(dashboardMetadata) {
    /**
     * dashboard metadata can either be retrieved from VisualForce page, or from a remoting service (similar to user preferences). this option is included as an example of an alternative.
     * 
     */
    var metadata = JSON.parse(dashboardMetadata);
    
    var service = {
      getDashboardMetadata: getDashboardMetadata
    };

    /*var metadata = {
      dashboardTitle: ""
    };*/
    
    return service;
        
    function getDashboardMetadata() {
        return metadata;
    }
  }
})();
