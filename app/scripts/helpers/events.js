define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    var events = _.extend({}, Backbone.Events);

    _.extend(events, {

        WINDOW_RESIZE : 'windowResize',

        MOUSE_MOVE    : 'mouseMove',

        TOUCH_START   : 'touchStart',
        TOUCH_MOVE    : 'touchMove',
        TOUCH_END     : 'touchEnd',

        LOAD_DONE     : 'loadDone',
        IMG_LOAD_DONE : 'imgLoadDone',

        TICK          : 'tick-loop',
        TICKER_STOP   : 'ticker-stop',

        SWAP_ARRAY    : 'swapArray',

        // maru nami view
        CREATE_ARROW : 'arrowCreate',
        //TRANSFORM_TO_NEXT : 'TransformToWorkOrAboutNext',

        // navigation
        LOAD_TO_HOME : 'loadToHome',

        ADD_HOME     : 'addHome',
        APPEND_ABOUT : 'AppendAboutView',
        APPEND_WORK  : 'AppendWorkView',

        TRANSFORM_NEXT : 'TransformToWorkOrAboutNext',

        // map

        MAP_CHANGE : 'mapChange'


    });


    return events;
});