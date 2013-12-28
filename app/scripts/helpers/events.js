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

        // map
        MAP_CHANGE : 'mapChange',
        MAP_GALLERY_REMOVE : 'mapGalleryRemove',

        // gallery

        GALLERY_REMOVE : 'onGalleryRemove',
        ON_RE_RENDER : 'onRender'


    });


    return events;
});