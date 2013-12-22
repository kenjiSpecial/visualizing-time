define([
    'jquery',
    'underscore',
    'helpers/events'
], function($, _, Events){1


    var Ticker = function(){
        //this.onAnimationFrame = this.onAnimationFrame.bind(this);
        _.bindAll(this, 'onAnimationFrame');
    }

    Ticker.prototype = {
        rafID : null,
        prevTime: null,
        deltas : null,
        paused : false,
        eventData : {
            delta: 0,
            paused: false
        },

        start : function(){
            this.startTime = +new Date();
            this.prevTime = +new Date();
            this.deltas = [];
            this.rafID     = requestAnimationFrame(this.onAnimationFrame);
        },

        stop : function(){
            cancelAnimationFrame(this.rafID);
        },

        onAnimationFrame : function(){

            var nextTime = +new Date(),
                delta = nextTime - this.prevTime;

            this.prevTime = nextTime;
            this.eventData.delta = delta;
            this.eventData.paused = this.paused;

            this.deltas.push(delta);

            while(this.deltas.length > 100) this.deltas.shift();
            Events.trigger(Events.TICK, this.eventData);
            this.rafID    = requestAnimationFrame(this.onAnimationFrame);
        },

        get frameLength() {
            var i   = this.deltas.length,
                sum = 0;

            while(i--) {
                sum += this.deltas[i];
            };

            return sum / this.deltas.length;
        },

        get FPS() {
            return 1000 / this.frameLength;
        }

    };

    var ticker = new Ticker();
    window.ticker = ticker;


    return ticker;

});