// Custom Directive - restricted to being used as an attribute
// Relies on the dataServices, requires access to ngModel, which access an ngModelController object - handle data binding, validation, more
// Have $error property

// Encapsulate functionality that can be used in views
'use strict';

define(['app'], function (app) {

    var injectParams = ['$q', 'dataService'];

    var wcUniqueDirective = function ($q, dataService) {

        var link = function (scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.unique = function (modelValue, viewValue) {
                var deferred = $q.defer(),
                    currentValue = modelValue || viewValue,
                    key = attrs.wcUniqueKey,
                    property = attrs.wcUniqueProperty;

                //First time the asyncValidators function is loaded the
                //key won't be set  so ensure that we have 
                //key and propertyName before checking with the server 
                if (key && property) {
                    dataService.checkUniqueValue(key, property, currentValue)
                    .then(function (unique) {
                        if (unique) {
                            deferred.resolve(); //It's unique
                        }
                        //    value is dirty and unique value is true, then error message shows
                        else {
                            deferred.reject(); //Add unique to $errors
                        }
                    });
                    return deferred.promise;
                }
                else {
                    return $q.when(true);
                }
            };
        };

        // Link function will be called to give access to the current scope, the element the directive is being applied to, attributes on the element, and the ngModelController
        return {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };
    };

    wcUniqueDirective.$inject = injectParams;

    app.directive('wcUnique', wcUniqueDirective);

});