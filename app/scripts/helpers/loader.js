define([
    'jquery',
    'underscore',
    'backbone',
    'd3',

    // helpers
    'helpers/commonData',
    'helpers/events'
],function( $, _, Backbone, d3, commonData, Events ){

    var Loader = function(){
        _.bindAll(this, 'geoLoadDone', 'exhibitLoadDone', 'imageLoadDone', 'allLoadDone');
    };

    Loader.prototype = {
        geoStatus           : false,
        exhibitStatus       : false,
        imageDataLoadStatus : false,


        startToLoad : function(){
            d3.json('json-data/geo-data.json', this.geoLoadDone);

            

        },

        geoLoadDone : function(error, output){
            commonData.geoData = output;
            this.geoStatus = true;

            this.allLoadDone();

        },

        exhibitLoadDone : function(){

            this.allLoadDone();
        },

        imageLoadDone : function(){


            this.allLoadDone();
        },

        allLoadDone : function(){
            if(this.geoStatus && this.exhibitStatus && this.imageDataLoadStatus ){

            }
        }


    };

    var loader = new Loader();
    return loader;

});