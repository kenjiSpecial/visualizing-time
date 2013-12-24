/**
 * Created by kenji-special on 12/22/13.
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



], function ($, _, Backbone, JST, jqueryTransit, exhibitCollection ) {
    var TimeLineEventListView = Backbone.View.extend({
        el : "#timeline-event-list",
        data : null,
        currentSetStatus: false,
        template : JST['app/scripts/templates/timeLineEventListTemplate.ejs'],

        initialize: function(){
        },

        set: function(id){
            if(this.currentSetStatus){

            } else {
                this.currentSetStatus = true;

                var model = exhibitCollection.get(id);
                this.data = model.toJSON();
                console.log(this.data);
                var contentItems = this.data['contentItems'];
                var categoryTypes = [];
                for(var i = 0; i < contentItems.length; i++){
                    var type = contentItems[i]['type'];

                    if(categoryTypes.length > 0){
                        var typeCheck = true;

                        for(var j in categoryTypes){
                            var categoryType = categoryTypes[j];
                            if(type == categoryType){
                                typeCheck = false;
                            }
                        }

                        if(typeCheck)
                            categoryTypes.push(type);

                    } else {
                        categoryTypes.push(type);
                    }
                }

                var html = this.template({ dataCollection: this.data, categoryTypes: categoryTypes });
                this.$el.html(html);

            }


        }
    });

    var timeLineEventListView = new TimeLineEventListView();
    return timeLineEventListView ;
});