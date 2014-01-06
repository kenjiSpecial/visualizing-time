define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'jqueryTransit',

    // helpers
    'helpers/commonData',
    'helpers/constants',
    'helpers/events',

    // views
    'views/sub/timelineView',
    'views/sub/timelineContentView',
    'views/sub/timelineGalleryView',

    // collection
    'collection/exhibitCollection',

    'helpers/modernizr'

],function ( $, _, Backbone, JST, jqueryTransit, commonData, constants, Events, timelineView, timelineContentViews, timelineGalleryView ) {
    var MainView = Backbone.View.extend({
        el : "#main-content",
        template : JST['app/scripts/templates/mainTemplate.ejs'],

        line  : null,
        $line : null,
        $description : null,

        initialize : function(){
            _.bindAll(this, 'onWindowResize');

            this.line = document.getElementById("timeline");
            this.$line = $(this.line);

            this.$el.css({
                width  : commonData.windowSize.width,
                height : commonData.windowSize.height
            });

            var left = commonData.windowSize.width - 250;
            var top  = commonData.windowSize.height - 30;

            this.$description = this.$el.find('#description');
            this.$description.css({translate: [ left, top ], opacity: 1});


            Events.on(Events.WINDOW_RESIZE, this.onWindowResize);
        },

        render : function(){
            var data = commonData.eventsData;

            constants.EVENT_START_YEAR = data.start;
            constants.EVENT_END_YEAR   = data.end;
            constants.EVENT_DURATION   = data.end - data.start;

            this.timelineRaw = data;
            this.createTimeLine();

            //this.parseExhibits(commonData.eventsData.exhibits);
            this.parseExhibits();
        },

        createTimeLine : function( ){

            this.$line.css('width', commonData.windowSize.width);
            timelineView.render();

        },

        parseExhibits : function(  ){

            // -------------

            timelineGalleryView.setTitle();

            // -------------

            timelineContentViews.render();


        },

        onWindowResize : function(){
            this.$el.css({
                width  : commonData.windowSize.width,
                height : commonData.windowSize.height
            });

            this.$line.css('width', commonData.windowSize.width);

            var left = commonData.windowSize.width - 250;
            var top  = commonData.windowSize.height - 30;
            this.$description.css({translate: [ left, top ]});
        }
    });

    return MainView;

});