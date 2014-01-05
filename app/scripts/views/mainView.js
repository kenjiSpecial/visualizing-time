define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'jqueryTransit',

    // helpers
    'helpers/commonData',
    'helpers/constants',

    // views
    'views/sub/timelineView',
    'views/sub/timelineContentView',
    'views/sub/timelineGalleryView',

    // collection
    'collection/exhibitCollection',

    'helpers/modernizr'

],function ( $, _, Backbone, JST, jqueryTransit, commonData, constants, timelineView, timelineContentViews, timelineGalleryView ) {
    var MainView = Backbone.View.extend({
        el : "#main-content",
        template : JST['app/scripts/templates/mainTemplate.ejs'],

        line  : null,
        $line : null,

        initialize : function(){

            this.line = document.getElementById("timeline");
            this.$line = $(this.line);

            this.$el.css({
                width  : commonData.windowSize.width,
                height : commonData.windowSize.height
            });

            if(Modernizr.mobile){
                this.$el.find('#description').css({'display': 'none'});
            }

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


        }
    });

    return MainView;

});