var _ = function(s) {return document.querySelector(s)}
var _all = function(s) {return document.querySelectorAll(s)}

//add a class to the element
window.addClass = function(el, className) {
    if (el.classList)
        el.classList.add(className);
    else
        el.className += ' ' + className;
}
//remove a Class from an Element
window.removeClass = function(el, className) {
    if (el.classList)
        el.classList.remove(className);
    else
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

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

//event listener short hand
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