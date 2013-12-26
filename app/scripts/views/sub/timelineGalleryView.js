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
        el       : "# timeline-events-gallery",
        template : JST['app/scripts/templates/TimeLineGalleryViewTemplate.ejs'],
        dataJson : null,

        initialize : function(){
            _.bindAll(this, 'render');
        },

        appendGalleryView : function(){

        },

        show : function(id){
            this.$el.css()

            var data = exhibitCollection.get(id);
            this.dataJson = data.toJSON();


            setTimeout(this.render, 1000);
        },

        render : function(){
            this.$el.
        }

    });

    var timelineGalleryView = new TimeLineGalleryView();

    if(commonData.debug){
        window.timelineGalleryView = timelineGalleryView;
    }

    return timelineGalleryView;
});