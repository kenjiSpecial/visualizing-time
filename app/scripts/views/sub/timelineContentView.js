define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'jqueryTransit',
    'tweenlite',

    // helpers
    'helpers/commonData',
    'helpers/constants',

    // collection
    'collection/exhibitCollection',

    // views
    'views/sub/timelineEventListView',
    'views/sub/timelineGalleryView',


],function( $, _, Backbone, JST, jqueryTransit, TweenLite, commonData, CONSTANTS, exhibitCollection, timelineListView, timelineGalleryView ){
    var TimeLineContentView = Backbone.View.extend({
        el  : "#timeline-content",
        tl  : "#timeline-graphics",
        $tl : null,

        count : 0,

        yearCollection : [],
        exhibitCollectionJSON : null,

        events : {
            "click .time-line-event-content" : "clickTimeLineEventContent"
        },

        template : JST['app/scripts/templates/timelineContentTemplate.ejs'],

        initialize: function(){
            _.bindAll(
                this,
                'loopAnimation'
            );

            this.$tl = $(this.tl);

        },

        render : function( ){

            this.exhibitCollectionJSON = exhibitCollection.toJSON();

            var prevYear;
            var id, div, $div, startY, height;
            for( var i in this.exhibitCollectionJSON ){
                var data  = this.exhibitCollectionJSON[i];

                var contentItems = data.contentItems;

                var year  = parseInt(data.time);
                var title = data.title;

                var html = this.template({ id: data.id, title: title, year: year });

                this.$el.append(html);

                /*
                for(var j in contentItems){
                    var contentItem = contentItems[j];
                    console.log()
                    var img = new Image();
                    img.src = contentItem.uri;
                    this.$tl.append(img);
                } */

                // --------

                var $year = $("#year-" + year);
                if(!$year.hasClass('emphasis'))
                    $year.addClass('emphasis');

                var rate           = (year - CONSTANTS.EVENT_START_YEAR) / CONSTANTS.EVENT_DURATION;
                var eventPositionX = ( rate * CONSTANTS.TIME_LINE_END_POS + ( 1 - rate ) * CONSTANTS.TIME_LINE_START_POS ) * commonData.windowSize.width;
                var domId = "#" + data.id;
                var posY = CONSTANTS.TIME_LINE_POS_Y2 + 50 * i + 20;

                var $domID = this.$el.find(domId);
                $domID.css({ translate: [ eventPositionX, posY ] })
                $domID.css({opacity: 0});

                timelineGalleryView.appendGalleryView( data.id, contentItems, year, eventPositionX,posY );


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
                    $div.attr('data-year', year);
                    this.$tl.append(div);

                    startY   = CONSTANTS.TIME_LINE_POS_Y2 + 8;
                    height   = posY - startY + 8;

                    $div.css({ translate: [ eventPositionX, startY ] });
                    $div.css( {"height":height, opacity : 0 });

                    // -----
                    this.yearCollection.push(year);

                }

                prevYear = year;
            }

            //this.renderAllEventPhotos();
            //this.loopAnimation();

            setTimeout(this.loopAnimation, 1500);

        },

        loopAnimation : function(){
            var year = this.yearCollection[this.count];

            var $year = $('.event-item-collection-year-' + year);
            $year.addClass('visible');

            var attribute = '*[data-year="' + year +'"]';
            $(attribute).each(function(index){
                TweenLite.to(this, 0.6, {opacity: 1});
            });

            // -------------

            this.count++;

            if( this.count < this.yearCollection.length )
                setTimeout(this.loopAnimation, 1000)
        },

        renderAllEventPhotos: function(){
            console.log(this.exhibitCollectionJSON);
        },

        clickTimeLineEventContent : function(event){

            var id = $(event.currentTarget).attr("id");
            console.log(id);
            //timelineListView.set(id);



        }
    });

    var timeLineContentView = new TimeLineContentView();
    return timeLineContentView;
})