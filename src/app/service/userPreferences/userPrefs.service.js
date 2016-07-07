(function() {
  'use strict';

  angular
    .module('app')
    .factory('userPrefsService', ['getPreferencesRemoting', 'updatePrefsRemoting', '$q','environment', '$timeout', userPrefsService]);

  /** @ngInject */
  function userPrefsService(getPreferencesRemoting, updatePrefsRemoting, $q, environment, $timeout) {
      var svc = this;
      /**
       * getPreferencesRemoting and updatePrefsRemoting are values passed in from the sf_vars module created on the VisualForce Page( see example page). They are the names of the get and set methods provided by Salesforce.
       * 
       */
    var service = {
      getUserPrefs: getUserPrefs,
      setUserPrefs: setUserPrefs,
    };
    
    return service;
    
    function setUserPrefs(prefs) {
        // some set data logic here, then a call to salesforce to update with new data.
        svc.data = prefs;
        updatePreferences();
    }

    function getUserPrefs() {
        //console.log('get preference called', getPreferencesRemoting);
        // get data from salesforce
        var deferred = $q.defer();

        /**
         * When developing locally, I comment out the VisualForce code block below.
         */
        Visualforce.remoting.Manager.invokeAction(
            getPreferencesRemoting,
            function(result, event) {
                if (event.status) {
                    var userPref = result;
                    svc.preferenceId = userPref.Id;
                    
                    console.log("User_Preference result: ", userPref);
                    
                    svc.data = JSON.parse(userPref.Preferences__c);
                    console.log("Preferences: ", svc.data); 
                    deferred.resolve(svc.data);
                } else {
                    deferred.reject(event);
                }
            },
            { buffer: true, escape: false, timeout: 30000 }
        );
        /*if (environment === "development" || environment === "local") {
            $timeout(function() {
                svc.data = svc.data2;  //svc.data2 is dummy data
                deferred.resolve(svc.data);
            }, 1000);
            return deferred.promise;
        }*/
        return deferred.promise;
    }
    
    function updatePreferences() {
        console.log('updating preferences', svc.data);
        var deferred = $q.defer();

        /**
         * When developing locally, I comment out the VisualForce code block below
         * and uncomment the return block below
         */
        Visualforce.remoting.Manager.invokeAction(
            updatePrefsRemoting,
            svc.preferenceId,
            JSON.stringify(svc.data),
            function(result, event) {
                if ( event.status ) {
                    console.log("user preference updated.");
                    deferred.resolve(svc.data);
                } else if ( event.type === 'exception' ) {
                    console.log("exception on getDataLabUserPreference");
                    deferred.reject(event);
                } else {

                }
            },
            { buffer: true, escape: false, timeout: 30000 }
        );

        /*if (environment === "development" || environment === "local") {
            return;
        }*/
        return deferred.promise;
    }
  }
})();
