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
    'helpers/events',
    'helpers/windowEvent'


], function( $, _, Backbone, d3, topojson, TweenLite, commonData, Events, windowEvent ){
    var MapView = Backbone.View.extend({
        el: "#main-map",
        projection : null,
        path : null,
        svg : null,

        initialize : function(){
            _.bindAll(this, 'render', 'onResize', 'onMapChange', 'onMapChange');


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
                  .attr('d', this.path);

           TweenLite.to(this.el, 1, {alpha: 1});

        },

        onResize : function(){
            this.svg.attr('width', commonData.windowSize.width )
                    .attr('height', commonData.windowSize.height );
        },

        onMapChange : function(id){
            var transform = commonData.mapTransformData[id];
            console.log(transform);
            console.log("");
            this.g.transition()
                .duration(1200).attr("transform", transform);
        }

    });

    return MapView;
});