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
        MAP_CAPTION_MOUSE_ENTER : 'onMapCaptionMouseEnter',
        MAP_CAPTION_MOUSE_LEAVE : 'onMapCaptionMouseLeave',

        // gallery
        GALLERY_REMOVE : 'onGalleryRemove',
        ON_RE_RENDER : 'onReRender',

        // time line
        ON_TIME_LINE_EMPHASIS_MOUSE_ENTER : 'onTimeLineEmphasisMouseEnter',
        ON_TIME_LINE_EMPHASIS_MOUSE_LEAVE : 'onTimeLineEmphasisMouseLeave',

        // time line content
        ON_GALLERY_RENDER : 'onGalleryRender',
        ON_MOUSE_ENTER_TL : 'onMouseEnterTimeLIneEventContent',
        ON_MOUSE_LEAVE_TL : 'onMouseLeaveTimeLIneEventContent'

    });


    return events;
});