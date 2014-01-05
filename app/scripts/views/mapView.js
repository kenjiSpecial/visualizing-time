define([
    // library
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'd3',
    'topojson',
    'tweenlite',

    // helpers
    'helpers/commonData',
    'helpers/constants',
    'helpers/events',
    'helpers/windowEvent',

    // views
    'views/sub/timelineContentView'


], function( $, _, Backbone, JST, d3, topojson, TweenLite, commonData, CONSTANTS, Events, windowEvent, timelineContentView ){
    var MapView = Backbone.View.extend({
        template: JST['app/scripts/templates/MapCountryList.ejs'],
        el: "#main-map",
        projection : null,
        path : null,
        svg : null,
        line : null,
        renderStatus : false,

        clickTextStatus : null,

        events : {
            "click svg": "onClick",

            'mouseenter .map-caption-list': "onMapCaptionMouseEnter",
            'mouseleave .map-caption-list': "onMapCaptionMouseLeave",
            'click .map-caption-list' : "onMapCaptionClick"
        },

        initialize : function(){
            _.bindAll(this, 'render', 'onResize', 'onMapChange', 'onMapChange', 'onClick', 'onMapMouseOver', 'onMapMouseOut', 'onGalleryRender', 'onGalleryRemove', 'onMouseEnterTimeLineEventContent', 'onMouseOutTimeLineEventContent');



            this.projection = d3.geo.mercator()
                //.center([0, 61])
                .scale(700);
                //.translate([ window.innerWidth/2, window.innerHeight/2]);

            this.path = d3.geo.path()
                            .projection(this.projection);



            this.svg = d3.select("#main-map").append("svg")
                        .attr('width', commonData.windowSize.width )
                        .attr('height', commonData.windowSize.height );

            this.g = this.svg.append("g");

            Events.on( Events.WINDOW_RESIZE, this.onResize);
            Events.on( Events.MAP_CHANGE, this.onMapChange);

            Events.on( Events.ON_GALLERY_RENDER, this.onGalleryRender);
            Events.on( Events.GALLERY_REMOVE, this.onGalleryRemove );

            Events.on(Events.ON_MOUSE_ENTER_TL, this.onMouseEnterTimeLineEventContent);
            Events.on(Events.ON_MOUSE_LEAVE_TL, this.onMouseOutTimeLineEventContent)

        },

        render : function(){
            this.g.selectAll('.subunit')
                  .data(topojson.feature(commonData.geoData, commonData.geoData.objects.sunits).features).enter().append("path")
                  .attr('d', this.path)
                  .attr('class', function(d){
                        var id = d.id;

                        var result = commonData.selectingCountriesListArray[id];
                        var className;

                        if(result){
                            className = 'selected country-' + id;
                        }else{
                            className = 'non-selected';
                        }
                    return className;
                  }).attr('data-country', function(d){
                    var id = d.id;

                    if(id) return id;

                  })
                  .on('mouseover', this.onMapMouseOver)
                  .on('mouseout', this.onMapMouseOut);



            var point = this.projection( commonData.centerPosition );


            var trasformString = 'translate(' + (window.innerWidth/2 -  point[0]) + ', ' + (window.innerHeight/2 -point[1]) + ')';
            this.g.attr("transform", trasformString);


            // -------------
            //  adding text
            // -------------

            var countryListText = this.template({countries: commonData.mapListCountryStyle});
            this.$el.find('.map-caption').html(countryListText);


           TweenLite.to(this.el, 1, {alpha: 1});

        },

        onResize : function(){
            this.svg.attr('width', commonData.windowSize.width )
                    .attr('height', commonData.windowSize.height );
        },

        onMapChange : function(id, currentType){
            this.$el.find('.selected').removeClass('selected');

            var countryItems = eventData[id]

            if(countryItems){
                var countries = countryItems[1];

                for(var i in countries){
                    var countryName = commonData.revMapListCountryStyleName[countries[i]];
                    var firstThreeCountryName = countryName.substring(0, 3).toLowerCase();
                    var $findCountry = this.$el.find('.map-caption-list-' + firstThreeCountryName);//.addClass("selected");
                    $findCountry.addClass("selected");
                }
            }

            var transformData;


            if(currentType == "map"){
                transformData = commonData.mapTransformData[id];
            }else{
                transformData = commonData.mapTransformData['default'];
            }

            var point = this.projection( transformData.latitude );
            var scale = transformData.scale;

            var transformString = 'translate(' + window.innerWidth/2 + ', ' + window.innerHeight/2 + ')scale(' + scale + ')translate(' + ( -1 * point[0] ) + ' , ' + ( -1 * point[1] ) + ')';
            this.g.transition()
                .duration(1200).attr("transform", transformString);

        },

        onClick : function(event){
            if(commonData.galleyShowStatus){
                Events.trigger(Events.MAP_GALLERY_REMOVE);
            }
            //alert('onClick');

        },

        // ------------------
        //  map action event
        // ------------------

        onMapMouseOver : function(d){
            var id = d.id;
            var countryClassString = '.country-' + id;
            var selected = this.g.selectAll(countryClassString);
            selected.classed('onMouseOver',true);

            var countryName = commonData.revMapListCountryStyle[id];

            if(countryName){
                var firstThreeCountryName = countryName.substring(0, 3).toLowerCase();
                var $findCountry = this.$el.find('.map-caption-list-' + firstThreeCountryName);//.addClass("selected");
                $findCountry.addClass("selected");
            }

        },

        onMapMouseOut : function(d){
            var id = d.id;
            var countryClassString = '.country-' + id;
            var selected = this.g.selectAll(countryClassString);
            selected.classed('onMouseOver',false);

            var countryName = commonData.revMapListCountryStyle[id];

            if(countryName){
                var firstThreeCountryName = countryName.substring(0, 3).toLowerCase();
                var $findCountry = this.$el.find('.map-caption-list-' + firstThreeCountryName);//.addClass("selected");
                $findCountry.removeClass("selected");
            }
        },


        // --------------------------
        //  map caption action event
        // --------------------------

        onMapCaptionMouseEnter : function(event){
            if(timelineContentView.clickState) return;

            if(!this.line){
                this.line = $('.time-visual-line');
            }
            this.line.addClass('invisible');



            this.clickTextStatus = false;

            var $target = $(event.currentTarget);
            var $targetHTMLText = $target.html();

            var country = $target.data("country");
            var countryIdArray = country.split(" ");

            for(var i in countryIdArray){
                var id = countryIdArray[i];
                var countryClassString = '.country-' + id;
                var selected = this.g.selectAll(countryClassString);
                selected.classed('onMouseOver',true);
            }

            // ------

            Events.trigger(Events.MAP_CAPTION_MOUSE_ENTER, $targetHTMLText);
        },

        onMapCaptionMouseLeave : function(event){
            if(timelineContentView.clickState) return;

            this.line.removeClass('invisible');

            var $target = $(event.currentTarget);
            var $targetHTMLText = $target.html();

            var country = $target.data("country");
            var countryIdArray = country.split(" ");

            for(var i in countryIdArray){
                var id = countryIdArray[i];
                var countryClassString = '.country-' + id;
                var selected = this.g.selectAll(countryClassString);
                selected.classed('onMouseOver',false);
            }

            if(this.clickTextStatus){
                var point = this.projection( commonData.centerPosition );
                var transformString = 'translate(' + (window.innerWidth/2 -  point[0]) + ', ' + (window.innerHeight/2 -point[1]) + ')scale(1)';
                this.g.transition()
                    .duration(1200).attr("transform", transformString);
            }

            Events.trigger(Events.MAP_CAPTION_MOUSE_LEAVE, $targetHTMLText);
        },

        onMapCaptionClick : function(event){
            if(this.clickTextStatus || commonData.galleyShowStatus) return;

            this.clickTextStatus = true;

            var $target = $(event.currentTarget);

            var countryText = $target.html();
            var scaleValue = commonData.countryScaleValue[countryText];

            var point = this.projection( scaleValue.latitude );
            var scale = scaleValue.scale;

            var transformString = 'translate(' + window.innerWidth/2 + ', ' + window.innerHeight/2 + ')scale(' + scale + ')translate(' + ( -1 * point[0] ) + ' , ' + ( -1 * point[1] ) + ')';

            this.g.transition()
                .duration(1200).attr("transform", transformString);
        },

        onGalleryRender : function(){
            this.renderStatus = true;

            this.$el.addClass('show-gallery');

            var countries = eventData[this.selectedID];

            for(var i in countries){
                var country = countries[i];
                var countryName = commonData.revMapListCountryStyleName[country];
                var countryIDs = commonData.mapListCountryStyle[countryName].id;

                for(var j in countryIDs){
                    var id = countryIDs[j];
                    var countryClassString = '.country-' + id;
                    var selected = this.g.selectAll(countryClassString);
                    selected.classed('onMouseOver', false);
                }
            }
        },

        onGalleryRemove : function(){
            this.renderStatus = false;
            var self = this;

            this.$el.find('.selected').removeClass('selected');

            setTimeout(function(){
                self.$el.removeClass('show-gallery');
            }, 500)

        },

        // -----------------------------
        //  mouse enter time line event
        // -----------------------------

        onMouseEnterTimeLineEventContent : function(id){
            this.selectedID = id;


            var countries = eventData[id];

            for(var i in countries){
                var country = countries[i];
                var countryName = commonData.revMapListCountryStyleName[country];


                var firstThreeCountryName = countryName.substring(0, 3).toLowerCase();
                var $findCountry = this.$el.find('.map-caption-list-' + firstThreeCountryName);//.addClass("selected");
                $findCountry.addClass("selected");

                //console.log(countryName);
                var countryIDs = commonData.mapListCountryStyle[countryName].id;
                for(var j in countryIDs){
                    var id = countryIDs[j];
                    var countryClassString = '.country-' + id;
                    var selected = this.g.selectAll(countryClassString);
                    selected.classed('onMouseOver',true);
                }

            }
        },

        onMouseOutTimeLineEventContent : function(id){
            if(this.renderStatus) return;
            var countries = eventData[id];


            for(var i in countries){
                var country = countries[i];
                var countryName = commonData.revMapListCountryStyleName[country];
                var countryIDs = commonData.mapListCountryStyle[countryName].id;

                for(var j in countryIDs){
                    var id = countryIDs[j];
                    var countryClassString = '.country-' + id;
                    var selected = this.g.selectAll(countryClassString);
                    selected.classed('onMouseOver', false);
                }
            }

            this.$el.find(".map-caption-list.selected").removeClass("selected");
        }


    });

    return MapView;
});