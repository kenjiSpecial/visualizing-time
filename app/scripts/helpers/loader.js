define([
    'jquery',
    'underscore',
    'backbone',
    'd3',

    // helpers
    'helpers/commonData',
    'helpers/events',

    // collection
    'collection/exhibitCollection'

],function( $, _, Backbone, d3, commonData, Events, exhibitCollection ){

    var Loader = function(){
        _.bindAll(this, 'geoLoadDone', 'exhibitLoadDone', 'imageLoadDone', 'onLoad', 'allLoadDone');
    };

    Loader.prototype = {
        geoStatus           : false,
        exhibitStatus       : false,
        imageDataLoadStatus : false,
        mediaData : {},


        startToLoad : function(){
            d3.json('json-data/geo-data.json', this.geoLoadDone);

            var superCollection = 'chronozoomer',
                subCollection   = 'chronozoomer',
                timeLine        = 'fefea7de-89d2-426e-91ba-b4d87c9bda4c';

            $.ajax({
                type : "GET",
                url  : "http://test.chronozoom.com/api/gettimelines",
                data : {
                    supercollection: superCollection,
                    collection: subCollection,
                    commonAncestor: timeLine,
                    depth: 5
                },

                dataType: "json",

                success : this.exhibitLoadDone,

                error : function( XMLHttpRequest, textStatus, errorThrown ) {
                    alert("Ajax error: "+textStatus+", "+errorThrown);
                }
            });

        },

        geoLoadDone : function(error, output){
            commonData.geoData = output;
            this.geoStatus = true;

            this.allLoadDone();

        },

        exhibitLoadDone : function( data, textStatus, jqXHR ){
            if(data != null){
                this.exhibitStatus = true;
                commonData.eventsData = data;
                this.imageLoadDone();

                var exhibits = data.exhibits;

                exhibitCollection.comparator = 'time';
                if( exhibits != null ){
                    for( var i = 0; i < exhibits.length; i++ ){
                        exhibitCollection.add(exhibits[i])
                    }
                }

                // -------------

                exhibitCollection.addUniqueValue();

                // -------------

            }
        },

        imageLoadDone : function(){
            console.log(commonData.eventsData);

            var exhibits = commonData.eventsData.exhibits;
            commonData.imageDataCollection = {};

            var i, j;
            var exhibit, contentItems, contentItem, contentItemID, mediaType, mediaUri;

            for( i in exhibits ){
                exhibit = exhibits[i];
                contentItems = exhibit.contentItems;

                for( j in contentItems ){
                    contentItem = contentItems[j];
                    contentItemID = contentItem.id;
                    mediaType = contentItem.mediaType;

                    commonData.imageDataCollection[contentItemID] = null;

                }
            }

            for( i in exhibits ){
                exhibit = exhibits[i];
                contentItems = exhibit.contentItems;

                for(j in contentItems){
                    contentItem = contentItems[j];
                    //console.log(contentItem);
                    contentItemID = contentItem.id;
                    mediaType = contentItem.mediaType;
                    mediaUri = contentItem.uri;

                    var image = new Image();

                    if(mediaType == "image"){
                        image.src = mediaUri;
                    } else {
                        var res = mediaUri.split('/');
                        var youtubeID = res[res.length - 1];
                        var imageString = 'http://img.youtube.com/vi/' + youtubeID + '/default.jpg';

                        image.src = imageString;
                    }

                    image.onload = this.onLoad(contentItemID, image);

                }
            }

        },

        onLoad : function( id, image ){
            commonData.imageDataCollection[id] = image;

            var checkStatus = true;
            for(var i in commonData.imageDataCollection){
                if(commonData.imageDataCollection[i] == null){
                    checkStatus = false;
                }
            }

            if(checkStatus){
                this.imageDataLoadStatus = true;
                this.allLoadDone();
            }
        },

        allLoadDone : function(){

            if(this.geoStatus && this.exhibitStatus && this.imageDataLoadStatus ){
                Events.trigger(Events.LOAD_DONE);
            }
        }


    };

    var loader = new Loader();
    return loader;

});