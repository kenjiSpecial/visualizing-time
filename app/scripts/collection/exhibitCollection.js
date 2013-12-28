define([
    'jquery',
    'underscore',
    'backbone',
    'templates',

    // helpers
    'helpers/eventData'

],function( $, _, Backbone, JST, eventData ){
    var ExhibitCollection = Backbone.Collection.extend({
        d3 : null,


        startToLoad : function(){

        },

        addUniqueValue: function(){

            for( var i = 0; i < this.models.length; i++ ){
                var model = this.models[i];
                var contentItems = model.get('contentItems');
                console.log(contentItems);

                for(var j in contentItems){
                    var title = contentItems[j]['title'];
                    var id = contentItems[j]['id'];
                    contentItems[j]['type'] = eventData[id][0];
                }

                model.set( 'contentItems', contentItems );
            }

            //console.log(this);

        }
    });
    var exhibitCollection = new ExhibitCollection();
    return exhibitCollection;
});