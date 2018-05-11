var _ = function (s) {
    this.cache = this.cache || {};
    if (!this.cache[s]) {
        this.cache[s] = document.querySelector(s);
        console.log('caching', s);
    }
    return this.cache[s];
};
var _all = function (s) {
    return document.querySelectorAll(s);
};

//sugar to the XMLHttpRequest
//Example: ajax.get('/get.php', {foo: 'bar'}, function() {});
//Example: ajax.post('/post.php', {foo: 'bar'}, function() {});
window.ajax = {};
window.ajax.x = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];
 
    var xhr;
    for (var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};
 
window.ajax.send = function (url, callback, method, data, async) {
    if (async === undefined) {
        async = true;
    }
    var x = window.ajax.x();
    x.open(method, url, async);
    x.onreadystatechange = function () {
        if (x.readyState == 4) {
            callback(x.responseText)
        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data)
};
 
window.ajax.get = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    window.ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
};
 
window.ajax.post = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    window.ajax.send(url, callback, 'POST', query.join('&'), async)
};
 

//add a class to the element
window.addClass = function(el, className) {
    if (el.classList)
        el.classList.add(className);
    else
        el.className += ' ' + className;
}
//remove a class from an Element
window.removeClass = function(el, className) {
    if (el.classList)
        el.classList.remove(className);
    else
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

//check for a class on an element
window.hasClass = function(el) {
    if (el.classList)
        el.classList.contains(className);
    else
        new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

//Toggle class on an element
window.toggleClass = function() {
    if (el.classList) {
        el.classList.toggle(className);
    } else {
        var classes = el.className.split(' ');
        var existingIndex = -1;
        for (var i = classes.length; i--;) {
            if (classes[i] === className)
                existingIndex = i;
        }

        if (existingIndex >= 0)
            classes.splice(existingIndex, 1);
        else
            classes.push(className);

        el.className = classes.join(' ');
    }
}

//addEventListener short hand
// on(document.body, 'click', function(e){console.log(e)});
window.on = function(el, eventName, cb) {
    if (el.addEventListener) {
        el.addEventListener(eventName, cb);
    } else {
        el.attachEvent('on' + eventName, function() {
            cb.call(el);
        });
    }
}
//Remove an event from an elemet
window.off = function(el, eventName, handler) {
    if (el.removeEventListener)
        el.removeEventListener(eventName, handler);
    else
        el.detachEvent('on' + eventName, handler);
}

//apply a function to all
// forEachElement(selector, function(el, i){
// });
window.forEachElement = function(selector, fn) {
    var elements = _all(selector);
    for (var i = 0; i < elements.length; i++)
        fn(elements[i], i);
}

//loop over array/nodelist
window.each = function(arr,callback){
    Array.prototype.forEach.call(arr,callback);
}

// we do not need jquery to smooth scrollTop
// usage:
//     var target = document.querySele..;
//     var duration = 1024;
//     jump(target.offsetTop, duration);
window.jump = function(to, duration) {
    var element = document.documentElement;
    var start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;

    var animate = function() {
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if (currentTime < duration) {
            setTimeout(animate, increment);
        }
    };
    animate();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};