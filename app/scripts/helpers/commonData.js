define([
    'jquery'
], function($){

		var CommonData = {
            window : window,
            $window : $(window),

            ctx : null,

            geoData    : null,
            eventsData : null,
            imageDataCollection: null,

            windowSize : { width: null, height: null },

            mouse     : { x: null, y: null },
            prevMouse : { x: null, y: null },
            touch     : { x: null, y: null },
            prevTouch : { x: null, y: null },
            touchDown : false,

			loading : false,
            loaded  : false,

            maruUpdateForceK : 0,
            namiUpdateForceK : 0,

            tweenValue : 0,
            tweenCurrentTime : 0,
            tweenDuration : 0,

            shapeToWeaveDuration: 1,

            debug : true
		};

		return CommonData
	}
);