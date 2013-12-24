define([
    'jquery',
    'underscore',
    'backbone',
    'templates',

],function($, _, Backbone, JST){
    var ExhibitCollection = Backbone.Collection.extend({
        addUniqueValue: function(){

            for( var i = 0; i < this.models.length; i++ ){
                var model = this.models[i];
                var contentItems = model.get('contentItems');

                for(var j in contentItems){
                    var title = contentItems[j]['title'];
                    console.log(title);

                    switch(title){
                        case "Léon Gambetta":
                            contentItems[j]['type'] = 'gallery';
                            break;
                        case 'Finding Balance':
                            contentItems[j]['type'] = 'gallery';
                            break;
                        case 'Creation of "New Germany"':
                            contentItems[j]['type'] = 'gallery';
                            break;
                        case 'The Great Illusion':
                            contentItems[j]['type'] = 'gallery';
                            break;
                        case 'Were Germans Unified?':
                            contentItems[j]['type'] = 'map';
                            break;
                        case 'What Does It Mean?!':
                            contentItems[j]['type'] = 'map';
                            break;
                        default:
                            contentItems[j]['type'] = 'image';
                    }
                }

                model.set( 'contentItems', contentItems );
            }

            console.log(this);

        }
    });
    var exhibitCollection = new ExhibitCollection();
    return exhibitCollection;
});