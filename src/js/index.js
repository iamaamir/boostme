"use strict";

(function() {
    var win = window,
        doc = document;

    win.whenReady = function(fn) {
        if (document.readyState != 'loading') {
            fn();
        } else if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            document.attachEvent('onreadystatechange', function() {
                if (document.readyState != 'loading')
                    fn();
            });
        }
    }
    // use this if you want to load things after loading everything such as img etc
    win.addEventListener('load', function() {

    }); // window loaded

    // when dom is ready
    whenReady(function() {
    });
    // DOMContentLoaded

})(window, document);