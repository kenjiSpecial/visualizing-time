define([
    'jquery',
    'underscore',
    'backbone',

    // views
    'views/mainView',
    'views/loadingView',
    'views/mapView',

    // helpers
    'helpers/Events',
    'helpers/ticker'

],function( $, _, Backbone, MainView, LoadingView, MapView, Events, Ticker ){
    //var mapView = new MapView();
    //var mainView = new MainView();
    //var loadingView

    var AppRouter = Backbone.Router.extend({
        mapView  : null,
        mainView : null,
        loadingView : null,
        timelineRaw : null,

        initialize: function(){

        },

        routes: {
            '*actions' : 'defaultAction'
        },

        defaultAction : function(){
            Ticker.start();

            this.mainView = new MainView();
            this.mapView  = new MapView();
            this.mapView.startToRender();

        }


    });

    return AppRouter;
});