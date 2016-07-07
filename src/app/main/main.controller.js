(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', ['$mdDialog', 'userPrefsService', '$scope', '$log', 'dashboardTitle', MainController]);

  /** @ngInject */
  function MainController($mdDialog, userPrefsService, $scope, $log, dashboardTitle) {
    var vm = this;
    /**
     * In this case, dashboardTitle comes from Salesforce, through the sf_vars module.
     * 
     */
    vm.$log = $log;

    vm.dashboard = {};
    vm.dashboard.title = dashboardTitle ? dashboardTitle : "Dashboard Title";

    activate();

    function activate() {
        userPrefsService.getUserPrefs();
    }
    var originatorEv;   
  }
})();