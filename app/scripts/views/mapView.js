define([
    // library
    'jquery',
    'underscore',
    'backbone',
    'd3',
    'topojson',

    // helpers
    'helpers/commonData',
    'helpers/Events',
    'helpers/windowEvent'


], function( $, _, Backbone, d3, topojson, commonData, Events, windowEvent ){
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

            console.log(commonData.windowSize.width);

            this.svg = d3.select("#main-map").append("svg")
                        .attr('width', commonData.windowSize.width )
                        .attr('height', commonData.windowSize.height );


        },
        startToRender : function(){
            d3.json('json-data/geo-data.json', this.render);
        },

        render : function(error, output){

            console.log(commonData.windowSize.width);
            this.svg.selectAll('.subunit')
                .data(topojson.feature(output, output.objects.sunits).features).enter().append("path")
                .attr('d', this.path);
        }

    });

    return MapView;
});