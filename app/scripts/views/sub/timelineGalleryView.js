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

    // collection
    'collection/exhibitCollection',
],function ($, _, Backbone, JST, jqueryTransit, exhibitCollection ) {
    var TimeLineGalleryView = Backbone.View.extend({
        el : "#timeline-events-gallery",
        template : JST['app/scripts/templates/TimeLineGalleryViewTemplate.ejs'],

        initialize : function(){

        },

        appendGalleryView : function(id, contentItems){
            console.log(contentItems);
            var html = this.template({id: id, contentItems: contentItems })
            this.$el.append(html);

        }
    });

    return new TimeLineGalleryView();
});