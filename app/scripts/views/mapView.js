define([
    // library
    'jquery',
    'underscore',
    'backbone',
    'd3',
    'topojson',
    'tweenlite',

    // helpers
    'helpers/commonData',
    'helpers/Events',
    'helpers/windowEvent'


], function( $, _, Backbone, d3, topojson, TweenLite, commonData, Events, windowEvent ){
    var MapView = Backbone.View.extend({
        el: "#main-map",
        projection : null,
        path : null,
        svg : null,

        initialize : function(){
            _.bindAll(this, 'render');

            this.projection = d3.geo.mercator()
                .center([0, 60.5])
                .scale(500);

            this.path = d3.geo.path()
                            .projection(this.projection);



            this.svg = d3.select("#main-map").append("svg")
                        .attr('width', commonData.windowSize.width )
                        .attr('height', commonData.windowSize.height );




        },

        render : function(){

            this.svg.selectAll('.subunit')
                .data(topojson.feature(commonData.geoData, commonData.geoData.objects.sunits).features).enter().append("path")
                .attr('d', this.path);

           TweenLite.to(this.el, 1, {alpha: 1});


        }

    });

    return MapView;
});