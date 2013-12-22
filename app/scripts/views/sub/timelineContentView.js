define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'jqueryTransit',

    // helpers
    'helpers/commonData',
    'helpers/constants',

    // collection
    'collection/exhibitCollection'


],function( $, _, Backbone, JST, jqueryTransit, commonData, CONSTANTS, exhibitCollection ){
    var TimeLineContentView = Backbone.View.extend({
        el:  "#timeline-content",
        template : JST['app/scripts/templates/timelineContentTemplate.ejs'],

        initialize: function(){

        },

        render : function( ){
            var exhibitCollectionJSON = exhibitCollection.toJSON();
            for( var i in exhibitCollectionJSON ){
                var data  = exhibitCollectionJSON[i];

                var year  = data.time;

                var html = this.template({ year : year, id: data.id });
                this.$el.append(html);

                // --------

                var rate           = (year - CONSTANTS.EVENT_START_YEAR) / CONSTANTS.EVENT_DURATION;
                var eventPositionX = ( rate * CONSTANTS.TIME_LINE_END_POS + ( 1 - rate ) * CONSTANTS.TIME_LINE_START_POS ) * commonData.windowSize.width;
                var domId = "#" + data.id;
                this.$el.find(domId).css({ translate: [ eventPositionX, CONSTANTS.TIME_LINE_POS_Y2 ], rotate: CONSTANTS.TIME_LINE_ROT1 })
            }

        }
    });

    var timeLineContentView = new TimeLineContentView();
    return timeLineContentView;
})