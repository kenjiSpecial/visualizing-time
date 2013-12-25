define([
    'jquery',
    'underscore',
    'backbone',
    'tweenlite',
    'templates',
    'jqueryTransit',

    'helpers/commonData',
    'helpers/constants'
],function( $, _, Backbone, TweenLite, JST, jqueryTransit, commonData, CONSTANTS ){
    var TimelineView = Backbone.View.extend({
        el:  "#timeline-content",

        yearStart : null,
        yearEnd   : null,

        template : JST['app/scripts/templates/timelineTemplate.ejs'],
        initialize: function(){
            this.$el.css({ opacity: 0 });
        },

        render : function(){
            var start    = CONSTANTS.EVENT_START_YEAR;
            var end      = CONSTANTS.EVENT_END_YEAR;
            var duration = CONSTANTS.EVENT_DURATION;

            var html = this.template({ start:start, end: end });
            this.$el.html(html);

            var startPos = commonData.windowSize.width * CONSTANTS.TIME_LINE_START_POS;
            var endPos   = commonData.windowSize.width * CONSTANTS.TIME_LINE_END_POS;

            this.yearStart = this.$el.find("#year-start").css({ translate: [ startPos , CONSTANTS.TIME_LINE_POS_Y2 ], rotate: CONSTANTS.TIME_LINE_ROT1 });
            this.yearEnd   = this.$el.find("#year-end").css({ translate: [ endPos, CONSTANTS.TIME_LINE_POS_Y2 ], rotate: CONSTANTS.TIME_LINE_ROT1 });

            for( var n = start - 10 ; n < end + 21 ; n ++) {
                if(n != start && n != end){
                    var rate = (n - start) / duration;
                    var curYearPosition = ( rate * CONSTANTS.TIME_LINE_END_POS + ( 1 - rate ) * CONSTANTS.TIME_LINE_START_POS ) * commonData.windowSize.width;
                    var yearClass = "#year-" + n;
                    this.$el.find(yearClass).css({ translate: [ curYearPosition , CONSTANTS.TIME_LINE_POS_Y2 ], rotate: CONSTANTS.TIME_LINE_ROT1 });
                }
            }

            TweenLite.to(this.el, 0.5, {opacity: 1, delay: 0.8});
        }
    });

    var timelineView = new TimelineView();
    return timelineView;
})