define([
    'jquery',
    'underscore',
    'backbone',
    'tweenlite',

    //helpers
    'helpers/events',
    'helpers/loader',

    // collection
    'collection/exhibitCollection'
],function( $, _, Backbone, TweenLite, Events, loader, exhibitCollection ){
    var LoadingView = Backbone.View.extend({
        side        : 50,
        halfSide    : 25,
        currentTime : 0,
        canvas      : null,
        context     : null,
        rectCollection : null,

        initialize: function(){
            _.bindAll(this, 'loop', 'onCompleteDone');

            this.canvas = document.getElementById("loadingCanvas");
            this.canvas.width = this.canvas.height = this.side;
            this.context = this.canvas.getContext("2d");

            this.rectCollection = new RectCollection(this.context);
            console.log(this.canvas);

        },

        startToLoad : function(){
            loader.startToLoad();

            Events.on( Events.TICK, this.loop );

        },

        loadDone : function(){
            TweenLite.to(this.canvas, 1, {alpha:0, onComplete: this.onCompleteDone });
        },

        loop: function(data){
            this.context.fillStyle = "#D4D4D4";
            this.context.fillRect(0, 0, this.side, this.side );

            this.rectCollection.update(data.delta);
            this.rectCollection.draw();
        },

        onCompleteDone : function(){
            this.canvas.style.display = "none";
            Events.off(Events.TICK, this.loop);
            Events.trigger( Events.TICKER_STOP );
        }



    });

    var RectCollection = function(ctx){
        this.rectCollection = [];
        for(var i = 0; i < 2; i++){
            var color;
            color = "#505050";
            var rect = new Rect(ctx, color, i*2);

            this.rectCollection.push(rect);
        }
    }

    RectCollection.prototype = {
        update : function(dt){
            for( var i = 0; i < this.rectCollection.length; i++ ){
                var rect = this.rectCollection[i];
                rect.update(dt);
            }
        },

        draw : function(){
            for( var i = 0; i < this.rectCollection.length; i++ ){
                var rect = this.rectCollection[i];
                rect.draw();
            }
        }
    };

    var Rect = function( context, color, num ){
        this.context = context;
        this.side    = 25;
        this.color   = color;
        this.dimension = num;

        switch (this.dimension){
            case 0:
                this.pos     = { x: 0, y: 0 };
                this.prevPos = { x: 0, y: 0 };
                this.nextPos = { x: this.side, y: 0 };
                break;
            case 1:
                this.pos = { x: this.side, y: 0 };
                this.prevPos = { x: this.side, y: 0 };
                this.nextPos = { x: this.side, y: this.side };
                break;
            case 2:
                this.pos = { X : this.side, y: this.side }
                this.prevPos = { x: this.side, y: this.side  };
                this.nextPos = { x: 0, y: this.side };
                break;
            case 3:
                this.pos = { x: 0, y: this.side };
                this.prevPos = { x: 0, y: this.side };
                this.nextPos = { x: 0, y: 0 };
                break;
        }
    };


    Rect.prototype = {
        context     : null,
        side        : null,
        dimension   : null,

        nextPos     : null,
        prevPos     : null,
        pos         : null,

        oneStep     : 400,
        oneInterval : 1000,
        currentTime : 0,

        update : function(dt){
            if(this.currentTime > this.oneInterval){
                this.currentTime = 0;
                this.setPosition();

                if(this.oneStep > 100){
                    this.oneStep *= 0.94;
                }
                if(this.oneInterval > 100){
                    this.oneInterval *= 0.94;
                }


            }
            this.currentTime += dt;

            var rate = (this.currentTime / this.oneStep) > 1 ? 1 : (this.currentTime / this.oneStep);


            this.pos.x = this.prevPos.x * (1 - rate) + this.nextPos.x * rate;
            this.pos.y = this.prevPos.y * (1 - rate) + this.nextPos.y * rate;

        },

        draw : function(){
            //console.log(this.color);
            this.context.fillStyle = this.color;
            this.context.fillRect( this.pos.x, this.pos.y, this.side, this.side );
        },

        setPosition: function(){
            this.dimension = (this.dimension + 1) % 4;

            this.prevPos = { x: this.pos.x, y: this.pos.y };

            switch (this.dimension){
                case 0:
                    this.nextPos = { x: this.side, y: 0 };
                    break;
                case 1:
                    this.nextPos = { x: this.side, y: this.side };
                    break;
                case 2:
                    this.nextPos = { x: 0, y: this.side };
                    break;
                case 3:
                    this.nextPos = { x: 0, y: 0 };
                    break;
            }


        }
    };

    return LoadingView;

});