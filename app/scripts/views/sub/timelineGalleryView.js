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

        appendGalleryView : function(){

        }
    });

    return new TimeLineGalleryView();
});