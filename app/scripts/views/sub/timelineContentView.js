define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'jqueryTransit',
    'tweenlite',

    // helpers
    'helpers/commonData',
    'helpers/eventData',
    'helpers/constants',
    'helpers/windowEvent',
    'helpers/events',

    // collection
    'collection/exhibitCollection',

    // views
    'views/sub/timelineEventListView',
    'views/sub/timelineGalleryView',


],function( $, _, Backbone, JST, jqueryTransit, TweenLite, commonData, eventData, CONSTANTS, windowEvent, Events, exhibitCollection, timelineListView, timelineGalleryView ){
    var TimeLineContentView = Backbone.View.extend({
        el  : "#timeline-content",

        tl  : "#timeline-graphics",
        $tl : null,

        timeline  : "#timeline-wrapper",

        showGalleryClass: 'timeline-gallery-show',
        yearTimeLineHeight : {},

        $timeline : null,
        $selected : null,

        count : 0,

        yearCollection : [],
        exhibitCollectionJSON : null,
        clickState : true,

        events : {
            "click .time-line-event-content-wrapper" : "clickTimeLineEventContent",
            "mouseenter .emphasis" : "mouseEnterTimeLineGalleryShow",
            "mouseout .emphasis" : "mouseLeaveTimeLineGalleryShow"
        },

        template : JST['app/scripts/templates/timelineContentTemplate.ejs'],

        initialize: function(){
            _.bindAll(
                this,
                'loopAnimation',
                'onGalleryRemove',
                'onGalleryRemoveSetTimeout',
                'onReRender',

                'onMapCaptionMouseEnter',
                'onMapCaptionMouseLeave'
            );

            this.$timeline = $(this.timeline);

            this.$tl = $(this.tl);

            Events.on( Events.GALLERY_REMOVE, this.onGalleryRemove );
            Events.on( Events.ON_RE_RENDER, this.onReRender );

            Events.on( Events.MAP_CAPTION_MOUSE_ENTER, this.onMapCaptionMouseEnter );
            Events.on( Events.MAP_CAPTION_MOUSE_LEAVE, this.onMapCaptionMouseLeave );

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

                var html = this.template({ id: data.id, title: title, year: year, contentItems: contentItems, eventData: eventData });


                this.$el.append(html);

                var imageDataCollection = commonData.imageDataCollection;

                for( var j in contentItems ){
                    var contentItem = contentItems[j];

                    var eventID = '#eventItem' + contentItem.id;

                    var contentItemImage = imageDataCollection[contentItem.id];

                    var contentItemImageWidth  = contentItemImage.width;
                    var contentItemImageHeight = contentItemImage.height;

                    var $eventID = $(eventID);

                    if(contentItemImageWidth > 10 && contentItemImageHeight > 10){
                        $eventID.append(contentItemImage);

                        if(contentItemImageWidth > contentItemImageHeight){
                            $eventID.find('img').addClass('img-landscape');
                        } else {
                            $eventID.find('img').addClass('img-vertical');
                        }

                    }else{
                        $eventID.addClass('display-none');
                    }

                }

                // --------

                var $year = $("#year-" + year);
                if(!$year.hasClass('emphasis'))
                    $year.addClass('emphasis');

                var rate           = (year - CONSTANTS.EVENT_START_YEAR) / CONSTANTS.EVENT_DURATION;
                var eventPositionX = ( rate * CONSTANTS.TIME_LINE_END_POS + ( 1 - rate ) * CONSTANTS.TIME_LINE_START_POS ) * commonData.windowSize.width + 8;
                var domId = "#time-line-event-" + data.id;
                var posY;
                if(i > 6){
                    posY = CONSTANTS.TIME_LINE_POS_Y2 + 70 * (i-7) + 20;
                } else if(i > 2){
                    posY = CONSTANTS.TIME_LINE_POS_Y2 + 70 * (i-3) + 20;
                }else if(i > 0){
                    posY = CONSTANTS.TIME_LINE_POS_Y2 + 70 * (i-1) + 20;
                }else{
                    posY = CONSTANTS.TIME_LINE_POS_Y2 + 70 * i + 20;
                }


                var $domID = this.$el.find(domId);
                $domID.css({ translate: [ eventPositionX, posY ] })
                $domID.css({opacity: 0});

                //timelineGalleryView.appendGalleryView( data.id, contentItems, year, eventPositionX,posY );


                if(prevYear == year){
                    id = '#timeline-visual-' + year;

                    $div = $(id);

                    startY   = CONSTANTS.TIME_LINE_POS_Y2 + 8;
                    height   = posY - startY + 30;
                    this.yearTimeLineHeight[year] = height;
                    //$div.css("height", height);

                } else {
                    div = document.createElement('div');
                    $div = $(div);
                    $div.addClass('time-visual-line');
                    id = 'timeline-visual-' + year;
                    $div.attr('id', id);
                    $div.attr('data-year', year);
                    this.$tl.append(div);

                    startY   = CONSTANTS.TIME_LINE_POS_Y2 + 8;
                    height   = posY - startY + 30;

                    $div.css({ translate: [ eventPositionX, startY ] });

                    $div.css( {"height":0 });

                    this.yearTimeLineHeight[year] = height;

                    // -----
                    this.yearCollection.push(year);

                }

                prevYear = year;
            }


            setTimeout(this.loopAnimation, 800);

        },

        loopAnimation : function(){

            for(var i = 0; i < this.yearCollection.length; i++){
                var year = this.yearCollection[i];

                var $year = $('.event-item-collection-year-' + year);
                $year.addClass('visible');

                var $timeLineVisual =  $('#timeline-visual-' + year);
                $timeLineVisual.css({height: this.yearTimeLineHeight[year]});

            }

            this.$timeVisualLine = $('.time-visual-line');

            var self = this;

            setTimeout(function(){
                self.clickState = false;

                for(var i = 0; i < self.yearCollection.length; i++){
                    var year = self.yearCollection[i];
                    var $timeLineEventContentWrapperYear = $('.time-line-event-content-wrapper-' + year);
                    $timeLineEventContentWrapperYear.css({ opacity: 1 });
                }
            }, 300);

        },


        clickTimeLineEventContent : function(event){
            if(this.clickState) return;

            this.clickState = true;

            // ---------
            // opacity 0 image and line

            for(var i in this.yearCollection){
                var year = this.yearCollection[i];

                var $year = $('.event-item-collection-year-' + year);
                $year.removeClass('visible');

                var $timeLineEventContentWrapperYear = $('.time-line-event-content-wrapper-' + year);
                $timeLineEventContentWrapperYear.css({ opacity: 0 });

            }
            this.$timeVisualLine.addClass('invisible');

            // ---------

            var $currentTarget = $(event.currentTarget);
            var domID   = $currentTarget.attr("id");

            var selectedYear = $currentTarget.data('year');
            this.selectID = $currentTarget.data('id');

            // change the color.

            var yearString = '#year-' + selectedYear;
            this.$selected = this.$el.find(yearString);
            var selectPosX = parseInt(this.$selected.css('x'))
            this.$selected.addClass('selected');


            // -------
            // showing the gallery

            timelineGalleryView.show( this.selectID, selectPosX );

            // -------

            Events.trigger(Events.ON_GALLERY_RENDER);

        },

        onGalleryRemove : function(){

            this.$timeline.removeClass(this.showGalleryClass);
            //

            setTimeout(this.onGalleryRemoveSetTimeout, 800);
        },

        onGalleryRemoveSetTimeout : function(){
            // reset the photo list gallery
            var data = exhibitCollection.get(this.selectID);
            var dataJSON = data.toJSON();
            var contentItems = dataJSON.contentItems;

            for(var i in contentItems){
                var contentItem = contentItems[i];
                var id = contentItem.id;

                var contentItemImage = commonData.imageDataCollection[id];
                var contentItemImageWidth  = contentItemImage.width;
                var contentItemImageHeight = contentItemImage.height;

                $(contentItemImage).attr("style", "");

                var eventID = '#eventItem' + contentItem.id;

                var $eventID = $(eventID);

                if(contentItemImageWidth > 10 && contentItemImageHeight > 10){
                    $eventID.append(contentItemImage);
                }

            }

            this.clickState = false;

            this.$selected.removeClass('selected');

            for(var i in this.yearCollection){

                var year = this.yearCollection[i];

                var $year = $('.event-item-collection-year-' + year);
                $year.addClass('visible');

                var $timeLineEventContentWrapperYear = $('.time-line-event-content-wrapper-' + year);
                $timeLineEventContentWrapperYear.css({ opacity: 1 });
            }

            this.$timeVisualLine.removeClass('invisible');
        },

        onReRender : function(selectedID){

            var data = exhibitCollection.get(this.selectID);
            var dataJSON = data.toJSON();
            var contentItems = dataJSON.contentItems;

            for(var i in contentItems){
                var contentItem = contentItems[i];
                var id = contentItem.id;

                var contentItemImage = commonData.imageDataCollection[id];
                var contentItemImageWidth  = contentItemImage.width;
                var contentItemImageHeight = contentItemImage.height;

                $(contentItemImage).attr("style", "");

                var eventID = '#eventItem' + contentItem.id;

                var $eventID = $(eventID);

                if(contentItemImageWidth > 10 && contentItemImageHeight > 10){
                    $eventID.append(contentItemImage);
                }

            }

            this.$selected.removeClass('selected');

            this.selectID = selectedID;
        },

        onMapCaptionMouseEnter : function( countryNameText ){

            if(!this.clickState){
                // console.log("timeLineCountryView.js onMapCaptionMouseEnter: country name is " + country_name_text );
                var countryName = commonData.mapListCountryStyle[countryNameText]['name'];
                var selectCountryClassString = 'event-item-image-' + countryName;
                var $eventItemImages = this.$el.find('.event-item-image');

                $eventItemImages.each( function(){
                    var $this = $(this);
                    if(!$this.hasClass(selectCountryClassString)){
                        $this.addClass('not-selected');
                    }
                } );

                // ------------

                var $timeLineEventContentWrapperClasses = this.$el.find('.time-line-event-content-wrapper');
                var selectEventCountryClassString = 'time-line-event-content-' + countryName;
                $timeLineEventContentWrapperClasses.each(function(){
                    var $this = $(this);
                    if($this.hasClass(selectEventCountryClassString)){
                        $this.addClass('selected')
                    }else{
                        //$this.addClass('not-selected');
                        $this.css({opacity: 0.1});
                    }
                });

            }
        },

        onMapCaptionMouseLeave : function( countryNameText ){
            if(!this.clickState){
                var $eventItemImages = this.$el.find('.event-item-image');

                $eventItemImages.each( function(){
                    var $this = $(this);
                    if($this.hasClass('not-selected')){
                        $this.removeClass('not-selected');
                    }
                } );

                // ------------

                var $timeLineEventContentWrapperClasses = this.$el.find('.time-line-event-content-wrapper');
                $timeLineEventContentWrapperClasses.each(function(){
                    var $this = $(this);
                    if($this.hasClass('selected')){
                        $this.removeClass('selected')
                    }else{
                        $this.css({opacity: 1});
                    }
                });

            }
        },

        mouseEnterTimeLineGalleryShow: function(){
            if(this.clickState){

            }
        },

        mouseLeaveTimeLineGalleryShow: function(){
            if(this.clickState){

            }
        }
    });

    var timeLineContentView = new TimeLineContentView();
    return timeLineContentView;
})