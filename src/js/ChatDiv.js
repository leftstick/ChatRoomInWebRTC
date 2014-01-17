/**
 * Directive, c-loader.
 */
Chat.directive('cLoader', ['Data', '$location',
    function(Data, $location) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs, controller) {

                var findTabFromLocation = function(location) {
                    var index = location.indexOf("#/");
                    if (index < 0)
                        return;
                    return location.substr(index + 1);
                }

                scope.$on('$locationChangeSuccess', function(event, newLoc, oldLoc) {
                    var tab = findTabFromLocation(newLoc);
                    if (tab && tab !== '/') {
                        if (!Data.user()) {
                            $location.path("/");
                        }
                    }
                });
            }
        };
    }
]);

/**
 * Directive, c-login.
 */
Chat.directive('cLogin', [

    function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs, controller) {
                element.modal({
                    backdrop: 'static',
                    keyboard: false
                });

                scope.$watch('status', function(newValue, oldValue) {
                    if (newValue === 'hide') {
                        $('body').removeClass('modal-open');
                        $('div.modal-backdrop').remove();
                    }
                });
            }
        };
    }
]);

/**
 * Directive, c-validate.
 */
Chat.directive('cValidate', [

    function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs, controller) {
                var model = attrs.cValidate;
                scope.$watch(model, function(newValue, oldValue) {
                    if (newValue) {
                        element.find('button').prop('disabled', false);
                        return;
                    }
                    element.find('button').prop('disabled', true);
                });
            }
        };
    }
]);