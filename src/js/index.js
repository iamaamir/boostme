/* requires:
plugins.js
*/

"use strict";

(function () {
    var win = window,
        doc = document;

    win.whenReady = function (fn) {
        if (document.readyState != 'loading') {
            fn();
        } else if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            document.attachEvent('onreadystatechange', function () {
                if (document.readyState != 'loading')
                    fn();
            });
        }
    }
    // use this if you want to load things after loading everything such as img etc
    win.addEventListener('load', function () {

    }); // window loaded

    // when dom is ready
    whenReady(function () {
        //hide the pre loader when DOM is loaded
        setTimeout(function () { // using setTimeout just to simulate a little loading effect
            addClass(_('.preloader'), 'hidden');
        }, 500);

        //smooth scroll
        //any anchor having a class scrollTo will gets smooth scrool effect
        // ex: <a class="scrollTo" href="#next">next</a>
        forEachElement('.scrollTo', function (link) {
            on(link, 'click', function (e) {
                e.preventDefault();
                var target = _(e.currentTarget.getAttribute('href'));
                jump(target.offsetTop, 1024);
            });
        });
    });
    // DOMContentLoaded

})(window, document);