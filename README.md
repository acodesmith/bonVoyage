Bon Voyage 0.1 Beta
====================================================================================
====================================================================================

A jQuery plugin for form change detection with exit warning message.
If a user changes a form field then tries to exit the page a warning message will appear.
Submitting the form will not cause the message to appear.

====================================================================================
====================================================================================

    //simple use, all fields watched
    $("form").bonVoyage();

    //All possible options
    $("form").bonVoyage({
        changeAgents: [],
        exitMessage: "Leaving the page will cause your changes to be lost.",
        ignoreAgents: [],
        ignoreButtons: [],
        afterChange: function () {},
        catchSubmit: false
    });


====================================================================================
====================================================================================