/**
 * Created by kenji-special on 12/24/13.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'jqueryTransit',

    // helpers
    'helpers/commonData',
    'helpers/events',

    // collection
    'collection/exhibitCollection',
],function ($, _, Backbone, JST, jqueryTransit, commonData, Events, exhibitCollection ) {
    var TimeLineGalleryView = Backbone.View.extend({
        el        : "#timeline-events-gallery",
        template  : JST['app/scripts/templates/TimeLineGalleryViewTemplate.ejs'],
        dataJson  : null,
        prevCount : 0,
        count     : 0,
        MAX_COUNT : 0,
        $prevSelector : null,
        $nextSelector : null,
        $timeLineGalleryUL : null,
        contentItems : null,

        events : {
            'click #prev-selector' : 'prevSelectorClick',
            'click #next-selector' : 'nextSelectorClick'
        },

        initialize : function(){
            _.bindAll(this, 'render', 'animationDone');


        },


        show : function( id, posX ){
            var data = exhibitCollection.get(id);
            this.dataJson = data.toJSON();

            var title = this.dataJson.title;
            this.contentItems = this.dataJson.contentItems;

            this.count = 0;
            this.MAX_COUNT = this.contentItems.length;

            this.posX = posX;
            this.$el.css({translate: [ 0, (commonData.windowSize.height - 100) ]});



            this.html = this.template({ title: title, contentItems: this.contentItems });

            setTimeout(this.render, 1000);
        },

        render : function(){
            var top = 50,
                height = commonData.windowSize.height - 150;
            this.$el.transition({ y: top, height: height, duration: 800 });

            setTimeout(this.animationDone, 800);

        },

        animationDone : function(){
            this.$el.html(this.html);

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
                    var width = (commonData.galleryWidth - imageWidth - 30);

                    $list.find('.content-item-description').css('width', width);

                }else{
                    type = 'default';
                }

                $list.addClass(type);
            }

            var $title = this.$el.find('.time-line-gallery-title');
            $title.css( { translate: [this.posX + 20, height+10]} );

            // set css for ul button

            var $buttonUI = this.$el.find(".button-ul");
            var _left = (commonData.windowSize.width - commonData.galleryWidth)/2 -30;
            $buttonUI.css({left: _left, top: 20 });



            var buttonString = '#button-' + this.count;
            var $listButton = this.$el.find(buttonString);
            $listButton.addClass('selected');


            this.$prevSelector = this.$el.find('#prev-selector');
            this.$nextSelector = this.$el.find('#next-selector');

            var _top = (commonData.windowSize.height - 20)/2

            var prevSelectorLeft = (commonData.windowSize.width - commonData.galleryWidth)/2 -40;
            var nextSelectorLeft = prevSelectorLeft + commonData.galleryWidth + 70;

            this.$prevSelector.css({left: prevSelectorLeft, top: _top });
            this.$nextSelector.css({left: nextSelectorLeft, top: _top });

        },

        nextSelectorClick : function(){
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
        },

        prevSelectorClick : function(){
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

        },

        changeMap: function(){
            var type = this.dataJson.contentItems[this.count].type;

            if(type == "map"){
                var contentID = this.dataJson.contentItems[this.count].id;
                console.log(contentID);
                Events.trigger(Events.MAP_CHANGE, contentID);
            }else{
                Events.trigger(Events.MAP_CHANGE, "default");
            }
        }


    });

    var timelineGalleryView = new TimeLineGalleryView();

    if(commonData.debug){
        window.timelineGalleryView = timelineGalleryView;
    }

    return timelineGalleryView;
});