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

    // collection
    'collection/exhibitCollection',
],function ($, _, Backbone, JST, jqueryTransit, commonData, exhibitCollection ) {
    var TimeLineGalleryView = Backbone.View.extend({
        el       : "#timeline-events-gallery",
        template : JST['app/scripts/templates/TimeLineGalleryViewTemplate.ejs'],
        dataJson : null,

        initialize : function(){
            _.bindAll(this, 'render', 'animationDone');
        },


        show : function( id, posX ){
            this.posX = posX;
            this.$el.css({translate: [ 0, (commonData.windowSize.height - 100) ]});

            var data = exhibitCollection.get(id);
            this.dataJson = data.toJSON();

            var title = this.dataJson.title;
            var contentItems = this.dataJson.contentItems;

            this.html = this.template({ title: title, contentItems: contentItems });

            setTimeout(this.render, 1000);
        },

        render : function(){
            var top = 100,
                height = commonData.windowSize.height - 200;
            this.$el.transition({ y: top, height: height, duration: 800 });

            setTimeout(this.animationDone, 800);

        },

        animationDone : function(){
            this.$el.html(this.html);

            var height = commonData.windowSize.height - 222;

            var contentItems = this.dataJson.contentItems;

            for(var i in contentItems){
                var contentitem = contentItems[i];
                var id = contentitem.id;

                var figureString = "#figure-" + id;
                var $figure =  this.$el.find(figureString);
                var image = commonData.imageDataCollection[id]
                $figure.append(image);

                var imageClass = $(image).attr('class');
                console.log(imageClass);
                var type = null;

                switch (image){
                    case 'img-landscape':
                        type = 'list-landscape';
                        break
                    case 'img-vertical':
                        type = 'list-vertical';
                        break
                }


                var listId = '#time-line-gallery-list-' + id;
                this.$el.find(listId).addClass(type);

            }

            this.$el.find('.time-line-gallery-title').css( { translate: [this.posX + 20, height]} );
        }

    });

    var timelineGalleryView = new TimeLineGalleryView();

    if(commonData.debug){
        window.timelineGalleryView = timelineGalleryView;
    }

    return timelineGalleryView;
});