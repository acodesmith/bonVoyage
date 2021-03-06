/*
Bon Voyage v0.1
Change Detections for Form
by aCodeSmith.com
Configurable:
Exit Message
Submit Catch
After Change Callback
Ignore Buttons
Ignore Fields 
Watch Fields / Change Agents 
*/
(function ($) {

    $.bonVoyage = function (element, options) {

        var defaults = {
            changeAgents: [],
            exitMessage: "Leaving the page will cause your changes to be lost.",
            ignoreAgents: [],
            ignoreButtons: [],
            afterChange: function () {},
            catchSubmit: false
        }

        var plugin = this;

        plugin.settings = {}

        var $element = $(element),
            element = element;

        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);

            var s = plugin.settings;
            bindAgents(s.changeAgents, s.ignoreAgents, exit, s.afterChange);
            unBindElements(s.ignoreButtons);
        }

        var bindAgents = function (change, ignore, exitCatch, callback) {

            //If No Change Agents all form elements are selected by default
            if ( !! change && change.constructor == Array && change.length > 0) {
                $element.on('change', change.join(", "), function () {
                    exitCatch();
                    callback();
                    handleSubmit();
                });
            } else {

                $element.on('change', "select, input, textarea", function () {
                    exitCatch();
                    callback();
                });

                $(ignore.join(", ")).unbind('change');
            }

            handleSubmit();
        }

        var unBindElements = function (handlers) {
            $(handlers.join(", ")).on('click', function () {
                $(window).unbind('beforeunload');
            });
            $(handlers.join(", ")).on('change', function () {
                $(window).unbind('beforeunload');
            });
        }

        var handleSubmit = function () {
            if (!plugin.settings.catchSubmit) {
                unBindElements(["input[type=submit]"]);
            }
        }


        var exit = function () {
            $(window).bind('beforeunload', function (e) {
                return plugin.settings.exitMessage;
            });
        }

        plugin.init();

    }

    $.fn.bonVoyage = function (options) {

        return this.each(function () {
            if (undefined == $(this).data('bonVoyage')) {
                var plugin = new $.bonVoyage(this, options);
                $(this).data('bonVoyage', plugin);
            }
        });

    }

})(jQuery);

// jQuery Plugin Boilerplate
// by Stefan Gabos