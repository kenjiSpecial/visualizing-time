define([
    'jquery',
    'underscore',
    'backbone',

    // views
    'views/mainView',
    'views/loadingView',
    'views/mapView',

    // helpers
    'helpers/events',
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
            _.bindAll( this, 'loadDone', 'tickerStop');

            Events.on( Events.LOAD_DONE, this.loadDone );
            Events.on( Events.TICKER_STOP, this.tickerStop );
        },

        routes: {
            '*actions' : 'defaultAction'
        },

        defaultAction : function(){
            Ticker.start();

            this.loadingView = new LoadingView();
            this.loadingView.startToLoad();

            // initialize the map view
            this.mapView = new MapView();
            this.mainView = new MainView();
        },

        loadDone : function(){
            var self = this;

            setTimeout(function(){
                self.loadingView.loadDone();
            }, 1000);

            // load view
            this.mapView.render();
        },

        tickerStop: function(){
            Ticker.stop();

            this.mainView.render();
        }


    });

    return AppRouter;
});