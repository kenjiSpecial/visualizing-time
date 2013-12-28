/**
 * Created by kenji-special on 12/24/13.
 */
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
    'helpers/events',

    // collection
    'collection/exhibitCollection',
],function ($, _, Backbone, JST, jqueryTransit, TweenLite, commonData, CONSTANTS, Events, exhibitCollection ) {
    var TimeLineGalleryView = Backbone.View.extend({
        el        : "#timeline-events-gallery",
        $elUl     : null,
        $elButton : null,
        $elTitle  : null,

        galleryUlTemplate  : JST['app/scripts/templates/GalleryULTemplate.ejs'],
        galleryButtonTemplate : JST['app/scripts/templates/GalleryButtonTemplate.ejs'],
        galleryTitlesTemplate : JST['app/scripts/templates/GalleryTitlesTemplate.ejs'],
        template : JST['app/scripts/templates/mainTemplate.ejs'],

        dataJson  : null,
        prevCount : 0,
        count     : 0,
        MAX_COUNT : 0,

        prevSelectId: null,
        selectId : null,

        $prevSelector : null,
        $nextSelector : null,
        $timeLineGalleryUL : null,
        contentItems : null,


        events : {
            'click #prev-selector' : 'prevSelectorClick',
            'click #next-selector' : 'nextSelectorClick',
            'click .button' : 'buttonClick',
            'click #gallery-remove' : 'onRemoveClick',
            'mouseenter .event-main-title-list' : 'onMouseEnterMainTitleList',
            'mouseleave .event-main-title-list' : 'onMouseLeaveMainTitleList'
        },

        initialize : function(){
            _.bindAll(this, 'render', 'animationDone', 'onRemoveComplete' );

            this.$elTitle  = $("#time-line-gallery-titles");
            this.$elButton = $('#time-line-gallery-button');
            this.$elUl     = $("#time-line-gallery-ul")
        },

        setTitle : function(){

            var titleButtonHTML = this.galleryTitlesTemplate({ exhibitionData: exhibitCollection.toJSON() });
            this.$elTitle.html(titleButtonHTML);
        },


        show : function( id, posX ){
            this.selectId = id;

            var data = exhibitCollection.get(id);
            this.dataJson = data.toJSON();

            var title = this.dataJson.title;
            this.contentItems = this.dataJson.contentItems;

            this.count = 0;
            this.MAX_COUNT = this.contentItems.length;

            var top = 50;

            this.$el.css({translate: [ 0, top ]});

            var ulHtml    = this.galleryUlTemplate({contentItems: this.contentItems});
            var buttonHtml = this.galleryButtonTemplate({contentItems: this.contentItems});

            this.$elUl.html(ulHtml);
            this.$elButton.html(buttonHtml);


            if(window.innerWidth <= CONSTANTS.MINIMUM_GALLERY_WIDTH){
                this.$el.css({width: CONSTANTS.MINIMUM_GALLERY_WIDTH});
            }

            var height = commonData.windowSize.height - 150;

            this.$el.transition({ height: height, duration: 800 });

            this.titleChange();

            setTimeout(this.animationDone, 600);
        },

        // render html
        animationDone : function(){
            var $title = this.$el.find('.time-line-gallery-title');
            $title.transition({ opacity: 1, duration: 400 });

            /** tween animation **/


            var timeLineGallryWrapper =  document.getElementById("tween-time-line-gallery");
            TweenLite.to(timeLineGallryWrapper, 1.2, {opacity: 1, delay: 0.3});

            this.$timeLineGalleryUL = this.$el.find("#time-line-gallery-ul");

            var height = commonData.windowSize.height - 182;

            for(var i in this.contentItems){
                var contentitem = this.contentItems[i];
                var id = contentitem.id;

                var figureString = "#figure-" + id;
                var $figure =  this.$el.find(figureString);
                var image = commonData.imageDataCollection[id];
                $figure.append(image);

                var imageClass = $(image).attr('class');

                var listId = '#time-line-gallery-list-' + id;
                var $list = this.$el.find(listId);

                var type ;
                var $image = $(image);
                if(imageClass == 'img-landscape'){
                    type = 'list-landscape';

                    //width = 800
                    var imgHeight = commonData.galleryWidth * $image.height() / $image.width();

                    if( imgHeight > (height - 50) ){
                        $image.css({ height: (height - 50) });

                        var scale = (height - 50)/ imgHeight;
                        var scaleWidth = commonData.galleryWidth * scale;
                        $list.find('.content-item-description').css({ width: scaleWidth })

                    }else{
                        $image.css({ width: commonData.galleryWidth});
                    }



                } else if(imageClass == 'img-vertical'){
                    type = 'list-vertical';
                    $image.css({height: (height - 50)});
                    var imageWidth = $image.width();
                    var width = (commonData.galleryWidth - imageWidth - 35);

                    $list.find('.content-item-description').css('width', width);

                }else{
                    type = 'default';
                }

                $list.addClass(type);
            }



            var buttonString = '#button-' + this.count;
            var $listButton = this.$el.find(buttonString);
            $listButton.addClass('selected');


            this.$prevSelector = this.$el.find('#prev-selector');
            this.$nextSelector = this.$el.find('#next-selector');


            if(this.contentItems.length == 1){
                this.$nextSelector.addClass('inactive');
            }

            this.changeMap();

            // var $circleEventTitle = this.$el.find(".circle-event-title");
            /*$circleEventTitle.each(function(){
                var $this = $(this);
                var _width = $this.innerWidth();
                console.log(_width);
                if( _width < 200 ){
                    $this.css({ width: _width })
                }else{
                    $this.css({ width: 200 })
                }
            })*/

        },

        nextSelectorClick : function(){
            if(this.count == this.MAX_COUNT - 1){
                return;
            }
            if(this.count == 0){
                this.$prevSelector.removeClass('inactive');
            }

            if(this.count == (this.MAX_COUNT - 2)){
                this.$nextSelector.addClass('inactive');
            }

            this.prevCount = this.count;
            this.count++;


            this.$timeLineGalleryUL.transition({
                x: '-=' + commonData.galleryWidth
            });


            this.changeMap();
            this.changeButton();
        },

        prevSelectorClick : function(){
            if(this.count == 0){
                return;
            }

            if(this.count == (this.MAX_COUNT - 1) ){
                this.$nextSelector.removeClass('inactive');
            }

            if(this.count == 1){
                this.$prevSelector.addClass('inactive');
            }

            this.prevCount = this.count;
            this.count--;

            this.$timeLineGalleryUL.transition({
                x: '+=' + commonData.galleryWidth
            });


            this.changeMap();

            this.changeButton();

        },

        changeButton : function(){
            var preButtonString ='#button-' + this.prevCount;
            var buttonString    = '#button-' + this.count;

            var $listButton     = this.$el.find(buttonString);
            var $prevListButton = this.$el.find(preButtonString);

            $listButton.addClass('selected');
            $prevListButton.removeClass('selected');
        },

        changeMap: function(){
            var type = this.dataJson.contentItems[this.count].type;

            if(type == "map"){
                var contentID = this.dataJson.contentItems[this.count].id;
                Events.trigger(Events.MAP_CHANGE, contentID);
            }else{
                Events.trigger(Events.MAP_CHANGE, "default");
            }
        },

        buttonClick : function(event){

            var id = $(event.currentTarget).attr('id');
            var count = parseInt( id.split('-')[1] );
            if(this.count == count) return;

            this.prevCount = this.count;
            this.count = count;

            var dCount = this.count - this.prevCount;

            var dDistance, duration;
            if(dCount > 0){
                dDistance = (dCount * commonData.galleryWidth);
                duration = 300 * dCount;

                this.$timeLineGalleryUL.transition({
                    x: '-=' + dDistance,
                    duration : duration
                });
            }else{
                dDistance = (dCount * commonData.galleryWidth * (-1));
                duration = 300 * dCount * (-1);

                this.$timeLineGalleryUL.transition({
                    x: '+=' + dDistance,
                    duration: duration
                });
            }


            if(this.prevCount < this.count){
                if(this.prevCount == 0){
                    this.$prevSelector.removeClass('inactive');
                }

                if(this.count == (this.MAX_COUNT - 1)){
                    this.$nextSelector.addClass('inactive');
                }
            }

            if(this.prevCount > this.count){
                if(this.prevCount == (this.MAX_COUNT - 1)){
                    this.$nextSelector.removeClass('inactive');
                }

                if(this.count == 0){
                    this.$prevSelector.addClass('inactive');
                }
            }

            this.changeMap();

            this.changeButton();
        },

        titleChange : function(){

            if(this.prevSelectId){
                var prevIdString = '#event-title-' + this.prevSelectId;
                this.$el.find(prevIdString).removeClass('selected');
            }

            var idString = '#event-title-' + this.selectId;
            this.$el.find(idString).addClass('selected');
        },

        onMouseEnterMainTitleList: function(event){

            var $currentTarget = $(event.currentTarget)
            var id = $currentTarget.data("id");
            console.log(id);

            var data = exhibitCollection.get(id);
            console.log(data);
            var year = parseInt(data.get('time'));
            console.log(year);
            var yearIDString = '#year-' + year;
            var $yearID = $(yearIDString);
            console.log($yearID);
            $yearID.addClass('selected');

        },

        onMouseLeaveMainTitleList : function(event){

            var $currentTarget = $(event.currentTarget)
            var id = $currentTarget.data("id");

            var data = exhibitCollection.get(id);
            var year = parseInt(data.get('time'));
            var yearIDString = '#year-' + year;
            var $yearID = $(yearIDString);
            $yearID.removeClass('selected');
        },

        onRemoveClick : function(){
            this.$el.find('.time-line-gallery-title').removeClass('active');
            var timeLineGallryWrapper =  document.getElementById("tween-time-line-gallery");
            TweenLite.to(timeLineGallryWrapper, 0.6, {opacity: 0, onComplete: this.onRemoveComplete });

            this.$el.transition({ height: 0, duration: 800 });

            Events.trigger(Events.GALLERY_REMOVE);
            Events.trigger(Events.MAP_CHANGE, "default");

        },

        onRemoveComplete : function(){
            this.prevSelectId = this.selectId;

            this.selectId()
        }


    });

    var timelineGalleryView = new TimeLineGalleryView();

    if(commonData.debug){
        window.timelineGalleryView = timelineGalleryView;
    }

    return timelineGalleryView;
});