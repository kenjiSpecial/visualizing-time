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
        el : "#timeline-events-gallery",
        template : JST['app/scripts/templates/TimeLineGalleryViewTemplate.ejs'],

        initialize : function(){

        },

        appendGalleryView : function( id, contentItems, year ){

            var html = this.template({id: id, contentItems: contentItems, year: year })
            this.$el.append(html);

            var imageDataCollection = commonData.imageDataCollection;

            for( var i in contentItems ){
                var contentItem = contentItems[i];
                var mediaType = contentItem.mediaType;

                var eventID = '#eventItem' + contentItem.id;

                var contentItemImage = imageDataCollection[contentItem.id];

                var contentItemImageWidth  = contentItemImage.width;
                var contentItemImageHeight = contentItemImage.height;
                console.log(contentItemImageWidth + ", " + contentItemImageHeight);

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




        }
    });

    return new TimeLineGalleryView();
});