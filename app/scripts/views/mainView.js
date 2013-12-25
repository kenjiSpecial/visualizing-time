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

    // collection
    'collection/exhibitCollection'

],function ( $, _, Backbone, JST, jqueryTransit, commonData, constants, timelineView, timelineContentViews ) {
    var MainView = Backbone.View.extend({
        el : "#main-content",
        template : JST['app/scripts/templates/mainTemplate.ejs'],

        line  : null,
        $line : null,

        initialize : function(){

            this.line = document.getElementById("timeline");
            this.$line = $(this.line);

            this.$el.find("#timeline-wrapper").css({
                width  : commonData.windowSize.width,
                height : commonData.windowSize.height
            });

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
            timelineContentViews.render();


        }
    });

    return MainView;

});