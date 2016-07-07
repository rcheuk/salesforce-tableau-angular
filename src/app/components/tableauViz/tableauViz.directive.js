(function() {
  'use strict';

  var app = angular
    .module('app');
    
    app.directive('tableauViz', ['dashboardMetadataService', 'userPrefsService', '$log', 'embedUrl', 'embedWidth', 'embedHeight', TableauVizDirective]);
    
    /* @ngInject */
    function TableauVizDirective(dashboardMetadataService, userPrefsService, $log, embedUrl, embedWidth, embedHeight) {

    /**
     * This directive renders the tableau visualization on the page based on visualization properties passed by Salesforce that identifies which page the user is on within Salesforce, and the associated metadata. 
     *  
     */

  var directive = {
    restrict: 'E',
    templateUrl: 'app/components/tableauViz/tableauViz.html',
    link: function(scope, elem, attrs) {
        scope.TableauController.placeholderDiv = elem[0].querySelector('.vizContainer');
        var url ="";
        var url = embedUrl;
        scope.TableauController.workbook, scope.TableauController.viz, scope.TableauController.activeSheet;
        
        elem.on('load', initializeViz());
        
        function initializeViz() {
            var options = {
                width: scope.TableauController.placeholderDiv.offsetWidth,
                height: scope.TableauController.placeholderDiv.offsetHeight,
                hideTabs: true,
                hideToolbar: true,
                onFirstInteractive: function () {
                    scope.TableauController.workbook = scope.TableauController.viz.getWorkbook();
                    scope.TableauController.setDefaultViews();
                    scope.TableauController.viz.addEventListener(tableau.TableauEventName.TAB_SWITCH, scope.TableauController.onTabSwitch);
                }
            };
            scope.TableauController.viz = new tableau.Viz(scope.TableauController.placeholderDiv, url, options); 
        }
    },
    controller: TableauVizController,
    controllerAs: 'TableauController',
    bindToController: {
        someVar: '='

    }
  };
 return directive;
}

})();

function TableauVizController ($scope, userPrefsService, dashboardMetadataService, $log) {
    var vm = this;

    // setting variables, getting variables
    vm.$log = $log;
    vm.metadata = dashboardMetadataService.getDashboardMetadata();
    
    // listen for changes on some variable to trigger changes to tableau viz
    $scope.$watchCollection('TableauController.someVar', function() {
        // trigger change
    });
       
    vm.setDefaultViews = function() {
        vm.$log.debug('Setting Defaults');
        //set defaults here
    };

    /**
     * The dashboard has a listener that monitors tab changes. When the user first loads a new tab that contains a custom 
     * index, if the default custom index hasn't been loaded, this method will load the default custom index.
     */
    vm.onTabSwitch = function() {
        var sheetName = vm.workbook.getActiveSheet().getName().trim();
        // listen for changes from the user on the viz, if user switches to new sheet/tab
        // , trigger changes if needed/desired
    };
};