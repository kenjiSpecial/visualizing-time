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

            galleryWidth: 800,

            maruUpdateForceK : 0,
            namiUpdateForceK : 0,

            tweenValue : 0,
            tweenCurrentTime : 0,
            tweenDuration : 0,

            shapeToWeaveDuration: 1,

            mapTransformData: {
                "4184c143-98bd-4ca3-bfca-d40ed34acc9b" : "translate(-1075, -890)scale(3)",
                "17387c82-756d-4571-b611-3380f33eeee4" : "translate(-970, -840)scale(2.8)",


                'default' : "translate(0, 0)scale(1)"

            },

            debug : true
		};

        if(CommonData.debug){
            window.commonData = CommonData;
        }

		return CommonData
	}
);