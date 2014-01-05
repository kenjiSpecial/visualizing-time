define([
    'jquery',
    'helpers/constants',
    'helpers/events'
],function($, Constans, Events){
    var keysDown = [],
        eventData = {
            keyCode : null,
            originalEvent: null
        };

    function onKeyUp(e){
        keysDown[e.keyCode] = false;

        eventData.keyCode       = e.keyCode;
        eventData.originalEvent = e;

        Events.trigger(Events.KEY_UP, eventData);
    }

    function onKeyDown(e){
        keysDown[e.keyCode] = true;

        eventData.keyCode       = e.keyCode;
        eventData.originalEvent = e;

        Events.trigger(Events.KEY_DOWN, eventData);
    }

    function enableKeys(){
        Constans.$DOCUMENT
            .on('keyup', onKeyUp)
            .on('keydown', onKeyDown);
    }

    function disableKeys(){
        Constans.$DOCUMENT
            .off('keyup', onKeyUp)
            .off('keydown', onKeyDown);
    }

    function isKeyDown(keyCode) {
        return keysDown[keyCode] == true;
    };

    enableKeys();

    return {
        // KEYCODES
        // http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
        KEY_SHIFT  : 16,
        KEY_CTRL   : 17,
        KEY_ALT    : 18,
        KEY_ESCAPE : 27,
        KEY_SPACE  : 32,
        KEY_PGUP   : 33,
        KEY_PGDN   : 34,
        KEY_END    : 35,
        KEY_HOME   : 36,
        KEY_LEFT   : 37,
        KEY_UP     : 38,
        KEY_RIGHT  : 39,
        KEY_DOWN   : 40,
        KEY_0      : 48,
        KEY_1      : 49,
        KEY_2      : 50,
        KEY_3      : 51,
        KEY_4      : 52,
        KEY_5      : 53,
        KEY_6      : 54,
        KEY_7      : 55,
        KEY_8      : 56,
        KEY_9      : 57,
        KEY_NUM_0  : 96,
        KEY_NUM_1  : 97,
        KEY_NUM_2  : 98,
        KEY_NUM_3  : 99,
        KEY_NUM_4  : 100,
        KEY_NUM_5  : 101,
        KEY_NUM_6  : 102,
        KEY_NUM_7  : 103,
        KEY_NUM_8  : 104,
        KEY_NUM_9  : 105,

        KEY_A      : 65,
        KEY_D      : 68,
        KEY_L      : 76,
        KEY_P      : 80,
        KEY_S      : 83,
        KEY_W      : 87,
        KEY_X      : 88,
        KEY_Z      : 90,

        enableKeys  : enableKeys,
        disableKeys : disableKeys,
        isKeyDown   : isKeyDown
    }

});