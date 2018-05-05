"use strict";

(function () {
    var win = window, doc = document;

    // use this if you want to load things after loading everything such as img etc
    win.addEventListener('load', function () {

    }); // window loaded

    // when dom is ready
    win.addEventListener("DOMContentLoaded", function () {
        alert("DOMContentLoaded");
    }); // DOMContentLoaded

})(window, document);