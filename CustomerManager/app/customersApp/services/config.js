'use strict';

define(['app'], function (app) {

    // Switch the application to use the Breeze, set it to TRUE
    var value = {
        useBreeze: false
    };

    app.value('config', value);

});