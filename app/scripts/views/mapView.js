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
    'helpers/windowEvent'


], function( $, _, Backbone, JST, d3, topojson, TweenLite, commonData, CONSTANTS, Events, windowEvent ){
    var MapView = Backbone.View.extend({
        template: JST['app/scripts/templates/MapCountryList.ejs'],
        el: "#main-map",
        projection : null,
        path : null,
        svg : null,

        events : {
            "click": "onClick",

            'click .map-caption-list': "onMapCaptionClick",
            'mouseenter .map-caption-list': "onMapCaptionMouseEnter",
            'mouseleave .map-caption-list': "onMapCaptionMouseLeave"
        },

        initialize : function(){
            _.bindAll(this, 'render', 'onResize', 'onMapChange', 'onMapChange', 'onClick', 'onMouseOver', 'onMouseOut');


            this.projection = d3.geo.mercator()
                .center([0, 61])
                .scale(500);

            this.path = d3.geo.path()
                            .projection(this.projection);



            this.svg = d3.select("#main-map").append("svg")
                        .attr('width', commonData.windowSize.width )
                        .attr('height', commonData.windowSize.height );

            this.g = this.svg.append("g");

            Events.on(Events.WINDOW_RESIZE, this.onResize);
            Events.on(Events.MAP_CHANGE, this.onMapChange);
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
                  .on('mouseover', this.onMouseOver)
                  .on('mouseout', this.onMouseOut);

            // -------------
            //  adding text
            // -------------
            var countryListText = this.template({countries: commonData.mapListCountry});
            console.log(countryListText)
            this.$el.find('.map-caption').html(countryListText);


           TweenLite.to(this.el, 1, {alpha: 1});

        },

        onResize : function(){
            this.svg.attr('width', commonData.windowSize.width )
                    .attr('height', commonData.windowSize.height );
        },

        onMapChange : function(id){
            var transform = commonData.mapTransformData[id];

            var translate = transform.translate;
            var scale     = transform.scale;

            var transX;
            if(id != 'default'){
                console.log(commonData.windowSize.height);
                transX = (commonData.windowSize.width - CONSTANTS.MINIMUM_GALLERY_WIDTH)/2 + (commonData.windowSize.height - 650)/6 + translate[0];
            } else {
                transX = translate[0];
            }

            // translate(0, 0)scale(1)
            var transY = translate[1];

            var trasformString = 'translate(' + transX + ', ' + transY + ')scale(' + scale + ')';
            this.g.transition()
                .duration(1200).attr("transform", trasformString);
        },

        onClick : function(){
            //alert('onClick');
            Events.trigger(Events.MAP_GALLERY_REMOVE);
        },

        onMouseOver : function(d){
            var id = d.id;
            var countryClassString = '.country-' + id;
            var selected = this.g.selectAll(countryClassString);
            selected.classed('onMouseOver',true);
        },

        onMouseOut : function(d){
            var id = d.id;
            var countryClassString = '.country-' + id;
            var selected = this.g.selectAll(countryClassString);
            selected.classed('onMouseOver',false);
        },

        // ------------------
        //  map action event
        // ------------------

        onMapCaptionClick : function(event){

        }

    });

    return MapView;
});