define([
    'jquery',
    'underscore',

    'helpers/commonData',
    'helpers/events',
    'helpers/modernizr'
],function( $, _, commonData, Events ){

    var WindowEvent = function(){

        commonData.windowSize.width  = window.innerWidth;
        if(commonData.windowSize.width < 1200) commonData.windowSize.width = 1200;
        commonData.windowSize.height = window.innerHeight;
        if(commonData.windowSize.height < 650) commonData.windowSize.height = 650;


        if(Modernizr.mobile){
            window.addEventListener( 'orientationchange', this.onResizeWindow );

            //document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

        } else {

            //commonData.$window.resize(this.onResizeWindow);
            commonData.$window.on( "resize", this.onResizeWindow );
            commonData.$window.on('mousemove', this.mouseMove);

        }

    }

    WindowEvent.prototype = {

        onResizeWindow : function(){
            commonData.windowSize.width  = window.innerWidth;
            if(commonData.windowSize.width < 1200) commonData.windowSize.width = 1200;
            commonData.windowSize.height = window.innerHeight;
            if(commonData.windowSize.height < 650) commonData.windowSize.height = 650;

            Events.trigger(Events.WINDOW_RESIZE);
        },

        mouseMove : function(event){

            commonData.mouse.x = event.pageX;
            commonData.mouse.y = event.pageY;

            Events.trigger( Events.MOUSE_MOVE );


            //event.preventDefault();
        },

        onTouchStart: function(event){

            commonData.prevTouch.x = event.pageX;
            commonData.prevTouch.y = event.pageY;

            commonData.touch.x = event.pageX;
            commonData.touch.y = event.pageY;

            Events.trigger(Events.TOUCH_START);

            event.preventDefault();
        },

        onTouchMove : function(event){
            commonData.prevTouch.x = commonData.touch.x;
            commonData.prevTouch.y = commonData.touch.y;

            commonData.touch.x = event.pageX;
            commonData.touch.y = event.pageY;

            Events.trigger(Events.TOUCH_MOVE);

            event.preventDefault();
        },

        onTouchEnd : function(event){
            commonData.prevTouch.x = event.pageX;
            commonData.prevTouch.y = event.pageY;

            commonData.touch.x = event.pageX;
            commonData.touch.y = event.pageY;

            Events.trigger(Events.TOUCH_END);

            event.preventDefault();
        }
    }



    return new WindowEvent();;

});