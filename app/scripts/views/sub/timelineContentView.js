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
    'collection/exhibitCollection',

    // views
    'views/sub/timelineEventListView'


],function( $, _, Backbone, JST, jqueryTransit, commonData, CONSTANTS, exhibitCollection, timelineListView ){
    var TimeLineContentView = Backbone.View.extend({
        el  : "#timeline-content",
        tl  : "#timeline-graphics",
        $tl : null,
        events : {
            "click .time-line-event-content" : "clickTimeLineEventContent"
        },

        template : JST['app/scripts/templates/timelineContentTemplate.ejs'],

        initialize: function(){
            this.$tl = $(this.tl);
        },

        render : function( ){

            var exhibitCollectionJSON = exhibitCollection.toJSON();

            var prevYear;
            var id, div, $div, startY, height;
            for( var i in exhibitCollectionJSON ){
                var data  = exhibitCollectionJSON[i];

                var year  = parseInt(data.time);
                var title = data.title;

                var html = this.template({ id: data.id, title: title });
                this.$el.append(html);

                // --------

                var $year = $("#year-" + year);
                if(!$year.hasClass('emphasis'))
                    $year.addClass('emphasis');

                var rate           = (year - CONSTANTS.EVENT_START_YEAR) / CONSTANTS.EVENT_DURATION;
                var eventPositionX = ( rate * CONSTANTS.TIME_LINE_END_POS + ( 1 - rate ) * CONSTANTS.TIME_LINE_START_POS ) * commonData.windowSize.width;
                var domId = "#" + data.id;
                var posY = CONSTANTS.TIME_LINE_POS_Y2 + 22 * i + 20;
                this.$el.find(domId).css({ translate: [ eventPositionX, posY ] })

                if(prevYear == year){
                    id = '#timeline-visual-' + year;

                    $div = $(id);

                    startY   = CONSTANTS.TIME_LINE_POS_Y2 + 8;
                    height   = posY - startY + 8;

                    $div.css("height", height);

                } else {
                    div = document.createElement('div');
                    $div = $(div);
                    $div.addClass('time-visual');
                    id = 'timeline-visual-' + year;
                    $div.attr('id', id);
                    this.$tl.append(div);

                    startY   = CONSTANTS.TIME_LINE_POS_Y2 + 8;
                    height   = posY - startY + 8;

                    $div.css({ translate: [ eventPositionX, startY ] });
                    $div.css( "height", height );

                }

                prevYear = year;
            }

        }

        /*clickTimeLineEventContent : function(event){

            var id = $(event.currentTarget).attr("id");
            console.log(id);
            timelineListView.set(id);

        }*/
    });

    var timeLineContentView = new TimeLineContentView();
    return timeLineContentView;
})